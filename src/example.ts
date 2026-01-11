import { prisma } from "./lib/prisma";

async function main() {
  try {
    const newLaptop = await prisma.laptop.create({
      data: {
        brand: "Apple",
        model: "Macbook Air M1 Pro",
        slug: "asus-macbook-air-m1-pri",
        cpu: "M1 Pro",
        releaseYear: 2024,
        price: 8999999,
      },
    });
    console.log(newLaptop);

    const allLaptop = await prisma.laptop.findMany();
    console.log(allLaptop);
  } catch (error) {
    console.log(error);
    console.log("Failed create & find laptop");
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
