import { logger } from "hono/logger";
import { laptopRoutes } from "./modules/laptops/routes";
import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.use(logger());

app.route("/laptops", laptopRoutes);

// API Docs
app.doc31("/openapi.json", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Laptops API",
    description:
      "A modern and lightweight **informational REST API** providing structured and detailed information about laptops, including specifications, brands, categories, hardware components, and pricing insights.",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
