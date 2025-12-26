import { initialDataLaptops } from "./data";
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

export const laptopRoutes = new OpenAPIHono();

let dataLaptops = initialDataLaptops;

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
  (c) => {
    return c.json(dataLaptops);
  }
);

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
    const slug = c.req.param("slug");
    const laptop = dataLaptops.find((laptop) => laptop.slug === slug);

    if (!laptop) {
      return c.json("Laptop not found", 404);
    }

    return c.json(laptop, 200);
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

    const newId =
      dataLaptops.length > 0 ? dataLaptops[dataLaptops.length - 1].id + 1 : 1;

    const newSlug = slugify(
      `${laptopBody.brand.toLowerCase()} ${laptopBody.model.toLowerCase()}`
    );

    const newLaptop: Laptop = {
      id: newId,
      slug: newSlug,
      ...laptopBody,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataLaptops = [...dataLaptops, newLaptop];

    return c.json(newLaptop, 201);
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
    dataLaptops = [];

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
    const laptop = dataLaptops.find((laptop) => laptop.id === id);

    if (!laptop) {
      return c.notFound();
    }

    const updatedLaptops = dataLaptops.filter((laptop) => laptop.id !== id);

    dataLaptops = updatedLaptops;

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

    const laptop = dataLaptops.find((laptop) => laptop.id === id);

    if (!laptop) {
      return c.notFound();
    }

    const brand = laptopBody.brand || laptop.brand;
    const model = laptopBody.model || laptop.model;

    const newSlug = slugify(`${brand.toLowerCase()} ${model.toLowerCase()}`);

    const updatedLaptop: Laptop = {
      ...laptop,
      ...laptopBody,
      slug: newSlug,
      updatedAt: new Date(),
    };

    const updatedLaptops = dataLaptops.map((laptop) => {
      if (laptop.id === id) {
        return updatedLaptop;
      }
      return laptop;
    });

    dataLaptops = updatedLaptops;

    return c.json(updatedLaptop);
  }
);
