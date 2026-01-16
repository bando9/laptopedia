-- DropForeignKey
ALTER TABLE "Laptop" DROP CONSTRAINT "Laptop_brandId_fkey";

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
