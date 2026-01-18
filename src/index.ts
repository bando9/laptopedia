import { logger } from "hono/logger";
import { laptopRoutes } from "./modules/laptops/routes";
import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";
import { brandRoutes } from "./modules/brands/routes";

const app = new OpenAPIHono();

app.use(logger());

// Configure API Routes
const apiRoutes = app
  .route("/laptops", laptopRoutes)
  .route("/brands", brandRoutes);

// API Docs
apiRoutes.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Laptops API",
    description:
      "A modern and lightweight **informational REST API** providing structured and detailed information about laptops, including specifications, brands, categories, hardware components, and pricing insights.",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
