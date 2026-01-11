import { prisma } from "./lib/prisma";

async function main() {
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

  // Fetch all laptop
  const allLaptop = await prisma.laptop.findMany();
  console.log(allLaptop);
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
