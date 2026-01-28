import {
  IdParamSchema,
  GetLaptopParamSchema,
  LaptopSchema,
  CreateLaptopSchema,
  ErrorSchema,
  UpdateLaptopSchema,
  SearchQuerySchema,
} from "./schema";
import slugify from "slugify";
import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { CreateLaptopType } from "./type";

export const laptopRoutes = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Validation failed",
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        400,
      );
    }
  },
});

const tags = ["laptops"];

// GET All Laptop
laptopRoutes.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all laptops",
    tags,
    responses: {
      200: {
        description: "Successfully get all laptops",
      },
    },
  },
  async (c) => {
    const laptops = await prisma.laptop.findMany({
      include: { brand: true },
    });
    return c.json(laptops);
  },
);

// Search
laptopRoutes.openapi(
  {
    method: "get",
    path: "/search",
    tags,
    request: {
      query: SearchQuerySchema,
    },
    description: "Search laptop by query",
    responses: {
      200: {
        description: "Successfully get laptop detail",
        content: { "application/json": { schema: LaptopSchema } },
      },
      404: {
        content: { "applicatoin/json": { schema: ErrorSchema } },
        description: "Laptop not found",
      },
    },
  },
  async (c) => {
    try {
      const { q } = c.req.valid("query");

      const foundLaptops = await prisma.laptop.findMany({
        where: {
          OR: [
            { cpu: { contains: q, mode: "insensitive" } },
            { gpu: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
        include: {
          brand: {
            select: { name: true },
          },
        },
      });

      if (!foundLaptops || foundLaptops.length == 0) {
        return c.json("Laptop not found", 404);
      }

      return c.json(foundLaptops, 200);
    } catch (error) {
      return c.json({ error: "Server error" }, 500);
    }
  },
);

// GET Laptop by Slug
laptopRoutes.openapi(
  {
    method: "get",
    path: "/{slug}",
    request: {
      params: GetLaptopParamSchema,
    },
    description: "Get one laptop by slug",
    tags,
    responses: {
      200: {
        description: "Successfully get laptop detail",
        content: { "application/json": { schema: LaptopSchema } },
      },
      404: {
        content: { "applicatoin/json": { schema: ErrorSchema } },
        description: "Laptop not found",
      },
    },
  },
  async (c) => {
    const slug = c.req.param("slug");

    const laptop = await prisma.laptop.findUnique({
      where: { slug: slug },
      include: { brand: true },
    });

    if (!laptop) {
      return c.json("Laptop not found", 404);
    }

    return c.json(laptop, 200);
  },
);

// CREATE new Laptop
laptopRoutes.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": { schema: CreateLaptopSchema },
        },
      },
    },
    description: "Create new laptop",
    tags,
    responses: {
      201: {
        content: { "application/json": { schema: LaptopSchema } },
        description: "Successfully created laptop",
      },
      400: {
        content: { "applicatoin/json": { schema: ErrorSchema } },
        description: "Validation Error / Bad Request",
      },
      500: {
        content: { "applicatoin/json": { schema: ErrorSchema } },
        description: "Internal Server Error",
      },
    },
  },
  async (c) => {
    try {
      const { brandSlug: brandName, ...laptopBody } = c.req.valid("json");

      const newSlug = slugify(
        `${brandName.toLowerCase()} ${laptopBody.model.toLowerCase()}`,
      );

      const newLaptop = await prisma.laptop.create({
        data: {
          ...laptopBody,
          slug: newSlug,
          brand: {
            connect: { name: brandName },
          },
        },
        include: { brand: true },
      });

      return c.json(newLaptop, 201);
    } catch (error: any) {
      console.log(error);
      return c.json({ message: "Internal Server Error" }, 500);
    }
  },
);

// DELETE All Laptop
laptopRoutes.openapi(
  {
    method: "delete",
    path: "/",
    description: "Delete all laptops",
    tags,
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
  },
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
    tags,
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
  },
);

// UPDATE Laptop by Id
laptopRoutes.openapi(
  {
    method: "patch",
    path: "/{id}",
    request: {
      params: IdParamSchema,
      body: { content: { "application/json": { schema: UpdateLaptopSchema } } },
    },
    description: "Update Laptop",
    tags,
    responses: {
      200: {
        content: { "application/json": { schema: CreateLaptopSchema } },
        description: "Successfully get laptop detail",
      },
      404: {
        description: "Laptop not found",
      },
      400: {
        content: { "applicatoin/json": { schema: ErrorSchema } },
        description: "Brand not found",
      },
      500: {
        content: { "applicatoin/json": { schema: ErrorSchema } },
        description: "Internal Server Error",
      },
    },
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const { brandSlug: brandName, ...laptopBody }: CreateLaptopType =
      await c.req.json();

    try {
      const laptop = await prisma.laptop.findUnique({
        where: { id: id },
        include: { brand: true },
      });

      if (!laptop) {
        return c.json("Laptop not found", 404);
      }

      let newSlug = laptop.slug;

      if (laptopBody.model || brandName) {
        const brand = brandName || laptop.brand.name;
        const model = laptopBody.model || laptop.model;

        newSlug = slugify(`${brand.toLowerCase()} ${model.toLowerCase()}`);
      }

      const updatedLaptop = await prisma.laptop.update({
        where: { id: id },
        data: {
          ...laptopBody,
          ...(brandName && {
            brand: { connect: { name: brandName } },
          }),
          slug: newSlug,
          updatedAt: new Date(),
        },
        include: { brand: true },
      });

      return c.json(updatedLaptop, 200);
    } catch (error: any) {
      if (error.code == "P2025") {
        return c.json("Brand not Found", 400);
      }
      return c.json("Internal Servel Error", 500);
    }
  },
);
