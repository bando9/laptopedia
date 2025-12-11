// import { Hono } from "hono";
import { logger } from "hono/logger";
import { laptopAPIRoutes, laptopRoutes } from "./modules/laptops/routes";
// import { commonRoute } from "./modules/common/route";
import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

// const app = new Hono();

// app.route("/", commonRoute);
// app.route("/laptops", laptopRoutes);

// API Docs
const appAPI = new OpenAPIHono();
appAPI.use(logger());

appAPI.route("/laptopss", laptopAPIRoutes);
const description =
  "Laptopedia is **informational REST API** providing structured and detailed information about laptops";

appAPI.doc31("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Laptops API",
    description,
  },
});

appAPI.get("/scalar", Scalar({ url: "/docs" }));

export default appAPI;
