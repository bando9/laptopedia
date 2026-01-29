import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { BrandsSchema } from "../laptops/schema";

export const brandRoutes = new OpenAPIHono();

const tags = ["brands"];

brandRoutes.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all Brand",
    tags,
    responses: {
      200: {
        description: "Successfully get all brands",
        content: { "application/json": { schema: BrandsSchema } },
      },
    },
  },
  async (c) => {
    const laptops = await prisma.brand.findMany({
      include: {
        laptops: {
          select: {
            id: true,
            slug: true,
            price: true,
          },
        },
      },
    });

    return c.json(laptops, 200);
  }
);
