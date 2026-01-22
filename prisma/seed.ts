import { prisma } from "../src/lib/prisma";
import {
  initialDataBrands,
  initialDataLaptops,
} from "../src/modules/laptops/data";

async function main() {
  for (const brand of initialDataBrands) {
    const upsertedBrand = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
    console.log(`🏷️ Brand: ${upsertedBrand.slug}`);
  }

  for (const dataLaptop of initialDataLaptops) {
    const { brandSlug, ...laptop } = dataLaptop;

    const upsertedLaptop = await prisma.laptop.upsert({
      where: { slug: dataLaptop.slug },
      update: {
        ...laptop,
        brand: { connect: { slug: brandSlug.toLowerCase() } },
      },
      create: {
        ...laptop,
        brand: { connect: { slug: brandSlug.toLowerCase() } },
      },
    });
    console.log(`💻 Laptop: ${upsertedLaptop.slug}`);
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
