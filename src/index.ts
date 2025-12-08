import { Hono } from "hono";
import { logger } from "hono/logger";
import { laptopRoutes } from "./modules/laptops/routes";
import { commonRoute } from "./modules/common/route";

const app = new Hono();

app.use(logger());

app.route("/", commonRoute);
app.route("/laptops", laptopRoutes);

export default app;
