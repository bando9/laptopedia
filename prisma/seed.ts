import { prisma } from "../src/lib/prisma";
import { initialDataLaptops } from "../src/modules/laptops/data";

async function main() {
  for (const laptop of initialDataLaptops) {
    await prisma.laptop.upsert({
      where: { slug: laptop.slug },
      update: {
        brand: laptop.brand,
        model: laptop.model,
        slug: laptop.slug,
        cpu: laptop.cpu,
        releaseYear: laptop.releaseYear,
        price: laptop.price,
      },
      create: {
        brand: laptop.brand,
        model: laptop.model,
        slug: laptop.slug,
        cpu: laptop.cpu,
        releaseYear: laptop.releaseYear,
        price: laptop.price,
      },
    });

    console.log(`💻 Laptop: ${laptop.slug}`);
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
