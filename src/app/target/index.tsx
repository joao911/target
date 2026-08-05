import { z } from "zod";
import { useState } from "react";
import { View, Alert } from "react-native";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CyrrencyInput ";
import { useTargetDataBase } from "@/database/useTargetDataBase";

export default function Target() {
  const { create } = useTargetDataBase();
  const [loading, setLoading] = useState(false);
  const targetSchema = z.object({
    name: z.string().min(5, "Nome obrigatório"),
    amount: z
      .number()
      .min(1, "Valor obrigatório")
      .superRefine((value, ctx) => {
        if (value <= 1) {
          ctx.addIssue({
            code: "custom",
            message: "O valor precisa ser maior que 1",
          });
        }
      }),
  });

  type TargetFormData = z.infer<typeof targetSchema>;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  async function handleCreateTarget(data: TargetFormData) {
    try {
      setLoading(true);
      await create(data);

      Alert.alert("Nova meta", "Meta criada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);

      reset();
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível criar a meta!");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: TargetFormData) => {
    console.log(data);
    handleCreateTarget(data);
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subTitle="Economize para alcançar seus objetivos"
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nome da Meta"
              placeholder="Ex: viagem para praia, smart watch"
              onChangeText={onChange}
              value={value}
              error={Boolean(errors.name)}
              textError={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <CurrencyInput
              label="Valor alvo (R$)"
              onChangeValue={(value) => onChange(value ?? 0)}
              value={value}
              error={Boolean(errors.amount)}
              textError={errors.amount?.message}
            />
          )}
        />
        <Button
          title="Salvar"
          onPress={handleSubmit(onSubmit)}
          isProcessing={loading}
        />
      </View>
    </View>
  );
}
