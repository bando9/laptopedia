import { initialDataLaptops } from "./data";
import {
  CreateLaptopSchema,
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

// TODO: Use .openapi for everything else below

laptopRoutes.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: { content: { "application/json": { schema: CreateLaptopSchema } } },
    },
    description: "________",
    responses: {
      201: {
        description: "Successfully________",
        content: { "application/json": { schema: LaptopSchema } },
      },
      404: {
        description: "Laptop not found",
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

    return c.json(newLaptop, 201);
  }
);

laptopRoutes.delete("/", (c) => {
  dataLaptops = [];

  return c.json({
    message: "All laptops deleted",
  });
});

laptopRoutes.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const foundLaptop = dataLaptops.find((laptop) => laptop.id === id);

  if (!foundLaptop) {
    return c.notFound();
  }

  const updatedLaptops = dataLaptops.filter(
    (laptop) => laptop.id !== Number(id)
  );

  dataLaptops = updatedLaptops;

  return c.json({
    message: `Laptop ${id} deleted`,
  });
});

laptopRoutes.patch("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const laptopBody = await c.req.json();

  const foundLaptop = dataLaptops.find((laptop) => laptop.id === id);

  if (!foundLaptop) {
    return c.notFound();
  }

  const updatedLaptop: Laptop = {
    ...foundLaptop,
    ...laptopBody,
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
});
