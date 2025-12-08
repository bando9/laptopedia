import { Hono } from "hono";
import { laptopsData } from "../../laptops";

export const laptopRoutes = new Hono();

laptopRoutes.get("/", (c) => {
  return c.json(laptopsData);
});
