import { Hono } from "hono";
import { dataLaptops, dataLaptops as initialData } from "./data";
import { Laptop } from "./schema";

export const laptopRoutes = new Hono();

laptopRoutes.get("/", (c) => {
  return c.json(dataLaptops);
});

laptopRoutes.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const foundLaptop = dataLaptops.find((laptop) => laptop.slug === slug);

  if (!foundLaptop) {
    return c.notFound();
  }

  return c.json(foundLaptop);
});

laptopRoutes.post("/", (c) => {
  const newDataLaptop: Laptop = {
    id: "lap_006",
    brand: "Asus",
    model: "Asus Vivobook 14",
    slug: "asus-vivobook-14",
    cpu: "",
    gpu: "",
    ram: "8GB DDR4",
    storage: "512GB SSD",
    display: "",
    battery: "",
    weight: "",
    release_year: 2022,
    price: 8500000,
    createdAt: new Date(),
  };

  const updatedData = [...dataLaptops, newDataLaptop];

  return c.json(updatedData);
});

laptopRoutes.delete("/:id", (c) => {
  const laptopId = c.req.param("id");
  const updatedData = dataLaptops.filter((laptop) => laptop.id !== laptopId);
  return c.json(updatedData);
});

laptopRoutes.delete("/", (c) => {
  let laptops = [...initialData];
  laptops = [];
  return c.json(laptops);
});

laptopRoutes.patch("/:slug", (c) => {
  const laptopSlug = c.req.param("slug");

  const updatedData = dataLaptops.map((laptop) => {
    if (laptop.slug === laptopSlug) {
      const updatedLaptop = {
        ...laptop,
        cpu: "AMD Ryzen 7 7840HS",
        gpu: "NVIDIA GeForce RTX 4060",
        ram: "16GB DDR5",
        storage: "512GB SSD",
      };
      return updatedLaptop;
    }
    return laptop;
  });

  return c.json(updatedData);
});
