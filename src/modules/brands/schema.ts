import { z } from "@hono/zod-openapi";
import { DateTimeSchema, IdSchema, SlugSchema } from "../laptops/schema";

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
export const BrandsSchema = BrandSchema.array();

export const CreateBrandSchema = BrandSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const CreateBrandsSchema = CreateBrandSchema.array();
