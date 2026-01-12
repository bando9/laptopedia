/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Laptop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Laptop_slug_key" ON "Laptop"("slug");
