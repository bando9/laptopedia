/*
  Warnings:

  - You are about to alter the column `slug` on the `Laptop` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - A unique constraint covering the columns `[slug]` on the table `Laptop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Laptop" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "cpu" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_slug_key" ON "Laptop"("slug");
