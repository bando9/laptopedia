import { z } from "@hono/zod-openapi";

export const SlugSchema = z.string().min(3);
export const DateTimeSchema = z.date();

export const LaptopSchema = z.object({
  id: z.number(),
  brand: z.string(), 
  model: z.string(),
  slug: SlugSchema,
  cpu: z.string(),
  gpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  display: z.string().optional(),
  battery: z.string().optional(),
  weight: z.string().optional(),
  releaseYear: z.number(),
  price: z.number(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});
export const LaptopsSchema = LaptopSchema.array();

export const CreateLaptopSchema = LaptopSchema.pick({
  brand: true,
  model: true,
  cpu: true,
  gpu: true,
  ram: true,
  storage: true,
  display: true,
  battery: true,
  weight: true,
  releaseYear: true,
  price: true,
});

export const UpdateLaptopSchema = LaptopSchema.pick({
  brand: true,
  model: true,
  cpu: true,
  gpu: true,
  ram: true,
  storage: true,
  display: true,
  battery: true,
  weight: true,
  releaseYear: true,
  price: true,
});

export const GetLaptopParamSchema = z.object({
  slug: SlugSchema,
});

export const IdParamSchema = z.object({
  id: z.coerce.number().positive(),
});

export const ErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: "Bad Request",
  }),
});
