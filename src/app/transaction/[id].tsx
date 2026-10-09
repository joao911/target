import { useState } from "react";
import { z } from "zod";
import { Alert, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { TransactionTypes } from "@/utils/transationtypes";
import { CurrencyInput } from "@/components/CyrrencyInput ";
import { TransactionType } from "@/components/TransactionType";
import { useTransactionsDatabase } from "@/database/useTransactionDataBase";

export default function Transaction() {
  const { create } = useTransactionsDatabase();
  const [type, setType] = useState(TransactionTypes.Input);
  const param = useLocalSearchParams<{ id: string }>();
  const targetSchema = z.object({
    observation: z.string().optional(),
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
      observation: "",
      amount: 0,
    },
  });

  const handleSubmitForm = async (data: TargetFormData) => {
    console.log("data", data);
    try {
      await create({
        target_id: Number(param.id),
        amount:
          type === TransactionTypes.Output ? data.amount * -1 : data.amount,
        observation: data.observation,
      });
      reset();
      Alert.alert("Transação criada", "Transação criada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a transação!");
      console.log("error", error);
    }
  };
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Transação"
        subTitle="A cada valor guardado você fica mais proximo da dua meta. Se esforce para guardar e evite retirar"
        rightButton={{
          onPress: () => {},
          icon: "edit",
        }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <CurrencyInput
              label="Valor alvo (R$)"
              value={value}
              onChangeValue={(value) => onChange(value ?? 0)}
              error={Boolean(errors.amount)}
              textError={errors.amount?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="observation"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Motivo (opcional)"
              placeholder="Ex: viagem para praia, smart watch"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Button title="Salvar" onPress={handleSubmit(handleSubmitForm)} />
      </View>
    </View>
  );
}
