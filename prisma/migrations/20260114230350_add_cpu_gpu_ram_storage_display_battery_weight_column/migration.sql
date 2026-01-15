/*
  Warnings:

  - Made the column `cpu` on table `Laptop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Laptop" ADD COLUMN     "battery" TEXT,
ADD COLUMN     "display" TEXT,
ADD COLUMN     "gpu" TEXT,
ADD COLUMN     "ram" TEXT,
ADD COLUMN     "storage" TEXT,
ADD COLUMN     "weight" TEXT,
ALTER COLUMN "cpu" SET NOT NULL,
ALTER COLUMN "releaseYear" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE TEXT;
