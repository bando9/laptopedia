import z from "zod";
import {
  BrandSchema,
  BrandsSchema,
  LaptopSchema,
  LaptopsSchema,
} from "./schema";

export type Laptop = z.infer<typeof LaptopSchema>;
export type Laptops = z.infer<typeof LaptopsSchema>;
export type BrandType = z.infer<typeof BrandSchema>;
export type BrandsType = z.infer<typeof BrandsSchema>;
