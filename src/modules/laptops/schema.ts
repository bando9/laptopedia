import { z } from "@hono/zod-openapi";

export const LaptopSchema = z.object({
  id: z.number(),
  brand: z.string(),
  model: z.string(),
  slug: z.string(),
  cpu: z.string(),
  gpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  display: z.string().optional(),
  battery: z.string().optional(),
  weight: z.string().optional(),
  release_year: z.number(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const LaptopsSchema = LaptopSchema.array();

export const CreateLaptopSchema = z.object({
  brand: z.string(),
  model: z.string(),
  cpu: z.string(),
  gpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  display: z.string().optional(),
  battery: z.string().optional(),
  weight: z.string().optional(),
  release_year: z.number(),
  price: z.number(),
});

export type Laptop = z.infer<typeof LaptopSchema>;
export type Laptops = z.infer<typeof LaptopsSchema>;

export const LaptopIdSchema = z.object({
  id: z.coerce.number().min(1).openapi({ example: 2 }),
});

export const LaptopSchemaAPI = z.object({
  id: z.string().openapi({ example: "1" }),
  brand: z.string().openapi({ example: "Asus" }),
  model: z.string().openapi({ example: "ROG Zephyrus G14" }),
  cpu: z.string().openapi({ example: "AMD Ryzen 7 7840HS" }),
});
