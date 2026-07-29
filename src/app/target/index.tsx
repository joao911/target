import { z } from "zod";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CyrrencyInput ";

export default function Target() {
  const targetSchema = z.object({
    name: z.string().min(5, "Nome obrigatório"),
    value: z
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
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      name: "",
      value: 0,
    },
  });

  console.log(errors);

  const onSubmit = (data: TargetFormData) => {
    console.log(data);
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
          name="value"
          render={({ field: { onChange, value } }) => (
            <CurrencyInput
              label="Valor alvo (R$)"
              onChangeValue={(value) => onChange(value ?? 0)}
              value={value}
              error={Boolean(errors.value)}
              textError={errors.value?.message}
            />
          )}
        />
        <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
