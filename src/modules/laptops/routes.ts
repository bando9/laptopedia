import {
  CreateLaptopSchema,
  IdParamSchema,
  ErrorSchema,
  GetLaptopParamSchema,
  LaptopSchema,
} from "./schema";
import slugify from "slugify";
import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { Laptop } from "./type";

export const laptopRoutes = new OpenAPIHono();

// GET All Laptop
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

// laptopRoutes.get("/search", async (c) => {
//   const {} = c.req.query();
//   const foundLaptops = await prisma.laptop.findMany({
//     where: {},
//   });

//   return c.json(foundLaptops);
// });

// GET Laptop by Slug
laptopRoutes.openapi(
  {
    method: "get",
    path: "/{slug}",
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
  async (c) => {
    const slug = c.req.param("slug");

    const laptop = await prisma.laptop.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!laptop) {
      return c.json("Laptop not found");
    }

    return c.json(laptop);
  }
);

// CREATE new Laptop
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
        content: { "application/json": { schema: LaptopSchema } },
        description: "Successfully created laptop",
      },
      400: {
        content: { "application/json": { schema: ErrorSchema } },
        description: "Returns an error",
      },
    },
  },
  async (c) => {
    const laptopBody = c.req.valid("json");

    const newSlug = slugify(
      `${laptopBody.brand.toLowerCase()} ${laptopBody.model.toLowerCase()}`
    );
    const newLaptop = await prisma.laptop.create({
      data: {
        ...laptopBody,
        slug: newSlug,
      },
    });

    return c.json(newLaptop, 201);
  }
);

// DELETE All Laptop
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
  async (c) => {
    await prisma.laptop.deleteMany({});

    return c.json({
      message: "All laptops deleted",
    });
  }
);

// DELETE Laptop by Id
laptopRoutes.openapi(
  {
    method: "delete",
    path: "/{id}",
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
  async (c) => {
    const id = Number(c.req.param("id"));
    const laptop = await prisma.laptop.findUnique({
      where: {
        id: id,
      },
    });

    if (laptop) {
      await prisma.laptop.delete({ where: { id: id } });
      return c.json({
        message: `Laptop ${id} deleted`,
      });
    } else {
      return c.json({ message: "Laptop not found" }, 404);
    }
  }
);

// UPDATE Laptop by Id
laptopRoutes.openapi(
  {
    method: "patch",
    path: "/{id}",
    request: {
      params: IdParamSchema,
    },
    description: "Update Laptop",
    responses: {
      200: {
        content: { "application/json": { schema: LaptopSchema } },
        description: "Successfully get laptop detail",
      },
      404: {
        description: "Laptop not found",
      },
    },
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const laptopBody = await c.req.json();
    const laptop = await prisma.laptop.findUnique({ where: { id: id } });

    if (!laptop) {
      return c.json("Laptop not found", 404);
    }

    const brand = laptopBody.brand || laptop?.brand;
    const model = laptopBody.model || laptop?.model;

    const newSlug = slugify(`${brand.toLowerCase()} ${model.toLowerCase()}`);

    const updatedLaptop = await prisma.laptop.update({
      where: { id: id },
      data: { ...laptop, ...laptopBody, slug: newSlug, updatedAt: new Date() },
    });

    return c.json(updatedLaptop);
  }
);
