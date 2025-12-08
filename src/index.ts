import { Hono } from "hono";
import { logger } from "hono/logger";
import { laptopRoutes } from "./modules/laptops/routes";
import { dataLaptops } from "./data";
import { commonRoute } from "./modules/common/route";

const app = new Hono();

app.use(logger());

app.route("/", commonRoute);
app.route("/laptops", laptopRoutes);

app.post("/laptops", (c) => {
  return c.json({
    id: "lap_006",
    brand: "Asus",
    model: "Asus Vivobook 14",
  });
});

app.delete("/laptops/:id", (c) => {
  const laptopId = c.req.param("id");
  const updateData = dataLaptops.filter((laptop) => laptop.id !== laptopId);

  return c.json(updateData);
});

app.delete("/laptops", (c) => {
  let data = dataLaptops;
  const updateData = (data = []);
  return c.json(updateData);
});

app.put("/laptops/:slug", (c) => {
  const laptopSlug = c.req.param("slug");

  const updateData = dataLaptops.map((laptop) => {
    if (laptop.slug === laptopSlug) {
      const updateLaptop = {
        ...laptop,
        cpu: "AMD Ryzen 7 7840HS",
        gpu: "NVIDIA GeForce RTX 4060",
        ram: "16GB DDR5",
        storage: "512GB SSD",
      };
      return updateLaptop;
    }
    return laptop;
  });

  return c.json(updateData);
});

export default app;
