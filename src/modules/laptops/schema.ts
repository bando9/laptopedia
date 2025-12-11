import { z } from "@hono/zod-openapi";

export const LaptopSlugSchema = z.object({
  slug: z.string().min(3),
});

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
