import { Hono } from "hono";
import { dataLaptops, dataLaptops as initialData } from "./data";
import { CreateLaptopSchema, Laptop } from "./schema";
import { zValidator } from "@hono/zod-validator";
import { issue } from "zod/v4/core/util.cjs";

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

laptopRoutes.post(
  "/",
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

    const newDataLaptop: Laptop = {
      id: String(newId),
      ...data,
      slug: "",
      createdAt: new Date(),
    };

    const updatedData = [...dataLaptops, newDataLaptop];

    return c.json(updatedData);
  }
);

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

laptopRoutes.patch("/:slug", async (c) => {
  const laptopSlug = c.req.param("slug");

  const data = await c.req.json();

  const updatedData = dataLaptops.map((laptop) => {
    if (laptop.slug === laptopSlug) {
      const updatedLaptop = {
        ...laptop,
        ...data,
      };
      return updatedLaptop;
    }
    return laptop;
  });

  return c.json(updatedData);
});
