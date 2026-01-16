import { prisma } from "../src/lib/prisma";
import { brands, initialDataLaptops } from "../src/modules/laptops/data";

async function main() {
  console.log("Seeding process...");
  const createBrands = await Promise.all(
    brands.map((b) => prisma.brand.create({ data: b }))
  );

  const brandMap = Object.fromEntries(
    createBrands.map((brand) => {
      console.log(`🏷️  Brand: ${brand.slug}`);
      return [brand.name, brand.id];
    })
  );

  await Promise.all(
    initialDataLaptops.map((laptop) => {
      const { brand, ...dataLaptop } = laptop;
      console.log(`💻 Laptop: ${laptop.slug}`);
      return prisma.laptop.create({
        data: {
          ...dataLaptop,
          brandId: brandMap[brand],
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
