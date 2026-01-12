import {
  CreateLaptopSchema,
  IdParamSchema,
  ErrorSchema,
  GetLaptopParamSchema,
  LaptopSchema,
} from "./schema";
import slugify from "slugify";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Laptop } from "./type";
import { prisma } from "../../lib/prisma";

export const laptopRoutes = new OpenAPIHono();

laptopRoutes.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all laptops",
    responses: {
      200: {
        description: "Successfully get all laptops",
      },
    },
  },
  async (c) => {
    const laptops = await prisma.laptop.findMany();
    return c.json(laptops);
  }
);

laptopRoutes.get("/search", async (c) => {
  const brand = c.req.query("brand");

  return c.json([]);
});

laptopRoutes.openapi(
  {
    method: "get",
    path: "/:slug",
    request: {
      params: GetLaptopParamSchema,
    },
    description: "Get one laptop by slug",
    responses: {
      200: {
        description: "Successfully get laptop detail",
        content: { "application/json": { schema: LaptopSchema } },
      },
      404: {
        description: "Laptop not found",
      },
    },
  },
  (c) => {
    return c.json({}, 200);
  }
);

laptopRoutes.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: { content: { "application/json": { schema: CreateLaptopSchema } } },
    },
    description: "Create new laptop",
    responses: {
      201: {
        content: { "application/json": { schema: CreateLaptopSchema } },
        description: "Successfully get laptop detail",
      },
      400: {
        content: { "application/json": { schema: ErrorSchema } },
        description: "Returns an error",
      },
    },
  },
  (c) => {
    const laptopBody = c.req.valid("json");

    return c.json({}, 201);
  }
);

laptopRoutes.openapi(
  {
    method: "delete",
    path: "/",
    description: "Delete all laptops",
    responses: {
      200: {
        description: "All laptops deleted",
      },
    },
  },
  (c) => {
    return c.json({
      message: "All laptops deleted",
    });
  }
);

laptopRoutes.openapi(
  {
    method: "delete",
    path: "/:id",
    description: "Delete laptop",
    request: {
      params: IdParamSchema,
    },
    responses: {
      200: {
        description: `Laptop deleted`,
      },
      404: {
        description: "Laptop not found",
      },
    },
  },
  (c) => {
    const id = Number(c.req.param("id"));

    return c.json({
      message: `Laptop ${id} deleted`,
    });
  }
);

laptopRoutes.openapi(
  {
    method: "patch",
    path: "/:id",
    request: {
      params: IdParamSchema,
    },
    description: "Create new laptop",
    responses: {
      200: {
        content: { "application/json": { schema: LaptopSchema } },
        description: "Successfully get laptop detail",
      },
      400: {
        content: { "application/json": { schema: ErrorSchema } },
        description: "Returns an error",
      },
      404: {
        description: "Laptop not found",
      },
    },
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const laptopBody = await c.req.json();

    return c.json({});
  }
);
