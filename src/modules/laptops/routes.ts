import { Hono } from "hono";
import { initialData } from "./data";
import { CreateLaptopSchema, Laptop } from "./schema";
import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";

export const laptopRoutes = new Hono();

let dataLaptops = initialData;

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

laptopRoutes.post(
  "/new",
  zValidator("json", CreateLaptopSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation error",
          issue: result.error.issues,
        },
        400
      );
    }
  }),
  (c) => {
    const data = c.req.valid("json");

    const newId =
      dataLaptops.length > 0 ? dataLaptops[dataLaptops.length - 1].id + 1 : 1;

    const newSlug = slugify(
      `${data.brand.toLowerCase()} ${data.model.toLowerCase()}`
    );

    const newDataLaptop: Laptop = {
      id: newId,
      slug: newSlug,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return c.json(newDataLaptop, 201);
  }
);

laptopRoutes.delete("/:id", (c) => {
  const laptopId = c.req.param("id");
  const foundLaptop = dataLaptops.find(
    (laptop) => laptop.id === Number(laptopId)
  );

  if (!foundLaptop) {
    return c.notFound();
  }

  const updatedData = dataLaptops.filter(
    (laptop) => laptop.id !== Number(laptopId)
  );

  return c.json({ updatedData });
});

laptopRoutes.delete("/", (c) => {
  dataLaptops = [];
  return c.json({ dataLaptops });
});

laptopRoutes.patch("/:id", async (c) => {
  const laptopId = c.req.param("id");
  const data = await c.req.json();

  const foundLaptop = dataLaptops.find(
    (laptop) => laptop.id === Number(laptopId)
  );

  if (!foundLaptop) {
    return c.notFound();
  }

  const updatedData = dataLaptops.map((laptop) => {
    if (laptop.id === Number(laptopId)) {
      const updatedLaptop: Laptop = {
        ...laptop,
        ...data,
        id: laptop.id,
        brand: data.brand || laptop.brand,
        model: data.model || laptop.model,
        slug: data.slug || laptop.slug,
        cpu: data.cpu || laptop.cpu,
        gpu: data.gpu || laptop.gpu,
        ram: data.ram || laptop.ram,
        storage: data.storage || laptop.storage,
        display: data.display || laptop.display,
        battery: data.battery || laptop.battery,
        weight: data.weight || laptop.weight,
        release_year: data.release_year || laptop.release_year,
        price: data.price || laptop.price,
        createdAt: laptop.createdAt,
        updatedAt: new Date(),
      };
      return updatedLaptop;
    }
    return laptop;
  });

  return c.json(updatedData);
});
