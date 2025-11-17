"use server";

import { addCategoria } from "@/services/categoriaService";

interface DadosCategoria {
  userId: string;
  name: string;
  description: string;
  valor: number;
  desconto: boolean;
}

export default async function insereCategoria(
  formData: DadosCategoria
): Promise<string | void> {
  try {
    await addCategoria({
      userId: formData.userId,
      name: formData.name,
      description: formData.description,
      valor: formData.valor,
      desconto: formData.desconto,
    });
    return "Tudo okay";
  } catch (err) {
    console.log("Erro ao inserir" + err);
    return "Não foi ok";
  }
}
