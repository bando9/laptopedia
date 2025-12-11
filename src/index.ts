import { logger } from "hono/logger";
import { laptopRoutes } from "./modules/laptops/routes";
import { commonRoute } from "./modules/common/route";
import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.use(logger());

app.route("/", commonRoute);
app.route("/laptops", laptopRoutes);

// API Docs
const description =
  "A modern and lightweight **informational REST API** providing structured and detailed information about laptops, including specifications, brands, categories, hardware components, and pricing insights.";

app.doc31("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Laptops API",
    description,
  },
});

app.get("/scalar", Scalar({ url: "/docs" }));

export default app;
