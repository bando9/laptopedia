import z from "zod";
import {
  CreateBrandSchema,
  CreateBrandsSchema,
  CreateLaptopSchema,
  LaptopSchema,
  SeedLaptopsSchema,
} from "./schema";

export type Laptop = z.infer<typeof LaptopSchema>;
export type SeedLaptopsType = z.infer<typeof SeedLaptopsSchema>;
export type CreateLaptopType = z.infer<typeof CreateLaptopSchema>;

export type CreateBrandType = z.infer<typeof CreateBrandSchema>;
export type CreateBrandsType = z.infer<typeof CreateBrandsSchema>;
