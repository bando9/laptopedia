import { z } from "@hono/zod-openapi";

export const SlugSchema = z.string().min(3);
export const DateTimeSchema = z.date();
export const IdSchema = z.number("not a number").positive();

// Base Brand Schema
export const BrandSchema = z.object({
  id: IdSchema,
  name: z.string(),
  slug: SlugSchema,
  imageUrl: z.string().nullable(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});
export const CreateBrandSchema = BrandSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const CreateBrandsSchema = CreateBrandSchema.array();

// Base Laptop Schema
export const LaptopSchema = z.object({
  id: IdSchema,
  brandId: z.int(),
  brand: BrandSchema,
  model: z.string("Not a string").min(3, "Too short!"),
  slug: SlugSchema,
  cpu: z.string().min(3, "Too short!"),
  gpu: z.string().min(3, "Too short!").optional().nullable(),
  ram: z.string().min(2, "Too short!").optional().nullable(),
  storage: z.string().optional().nullable(),
  display: z.string().optional().nullable(),
  battery: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  releaseYear: z.number().min(1981, "Too old years!").openapi({
    example: 2025,
  }),
  price: z.number().min(500000, "Too chip, impossible"),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

export const CreateLaptopWithoutAutoGenSchema = LaptopSchema.omit({
  id: true,
  brandId: true,
  brand: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateLaptopWithoutSlugSchema =
  CreateLaptopWithoutAutoGenSchema.omit({ slug: true });

export const CreateLaptopSchema = CreateLaptopWithoutSlugSchema.extend({
  brandName: z.string().min(2),
});

const SeedLaptopSchema = CreateLaptopWithoutAutoGenSchema.extend({
  brandName: z.string().min(2),
});
export const SeedLaptopsSchema = SeedLaptopSchema.array();

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

export const PutLaptopSchema = LaptopSchema.pick({
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
