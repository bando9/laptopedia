import { prisma } from "../src/lib/prisma";
import { brands, initialDataLaptops } from "../src/modules/laptops/data";

async function main() {
  console.log("Seeding process...");

  for (const brand of brands) {
    const upsertedBrand = await prisma.brand.upsert({
      where: { slug: brand.slug },
      create: brand,
      update: brand,
    });
    console.log(`🏷️  Brand: ${upsertedBrand.slug}`);
  }

  for (const dataLaptop of initialDataLaptops) {
    const { brandSlug, ...laptop } = dataLaptop;

    const upsetedLaptop = await prisma.laptop.upsert({
      where: { slug: dataLaptop.slug },
      update: { ...laptop, brand: { connect: { slug: brandSlug } } },
      create: { ...laptop, brand: { connect: { slug: brandSlug } } },
    });
    console.log(`💻 Laptop: ${upsetedLaptop.slug}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
