/*
  Warnings:

  - The `desconto` column on the `Categoria` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Categoria" DROP COLUMN "desconto",
ADD COLUMN     "desconto" BOOLEAN NOT NULL DEFAULT false;