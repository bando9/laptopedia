import { z } from "@hono/zod-openapi";

export const SlugSchema = z
  .string()
  .min(3)
  .openapi({ example: "apple-macbook-pro-m3" });
export const DateTimeSchema = z.date();
export const IdSchema = z.number("id must be a number").positive().int();

// Base Brand Schema
export const BrandSchema = z.object({
  id: IdSchema,
  name: z.string().min(2).openapi({ example: "Apple" }),
  slug: SlugSchema,
  imageUrl: z
    .string()
    .nullable()
    .openapi({ example: "https://logo.com/apple.png" }),
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
  brandId: z.number().int().openapi({ example: 1 }),
  brand: BrandSchema,
  model: z.string().min(3, "Model name is too short (min 3)"),
  slug: SlugSchema,
  cpu: z.string().min(3, "CPU info is too short"),
  gpu: z.string().min(2).optional().nullable(),
  ram: z.string().min(2).optional().nullable(),
  storage: z.string().optional().nullable(),
  display: z.string().optional().nullable(),
  battery: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  releaseYear: z
    .number()
    .min(1981, "Release year must be 1981 or later")
    .openapi({
      example: 2025,
    }),
  price: z
    .number()
    .min(500000, "Price is too cheap, impossible")
    .openapi({ example: 500000 }),
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

export const UpdateLaptopSchema = CreateLaptopSchema.partial();

const SeedLaptopSchema = CreateLaptopWithoutAutoGenSchema.extend({
  brandName: z.string().min(2),
});
export const SeedLaptopsSchema = SeedLaptopSchema.array();

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
  success: z.boolean().openapi({ example: false }),
  errors: z.array(
    z
      .object({
        field: z.string().openapi({ example: "model" }),
        message: z.string().openapi({ example: "Min 3 character" }),
      })
      .optional(),
  ),
  message: z.string().optional().openapi({ example: "Internal Server Error" }),
});
