import { Hono } from "hono";
import { dataLaptops } from "../../data";

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
