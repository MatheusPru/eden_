-- DropForeignKey
ALTER TABLE "public"."LimiteMensal" DROP CONSTRAINT "LimiteMensal_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Movimentacao" DROP CONSTRAINT "Movimentacao_categoriaId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Movimentacao" ADD CONSTRAINT "Movimentacao_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LimiteMensal" ADD CONSTRAINT "LimiteMensal_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
