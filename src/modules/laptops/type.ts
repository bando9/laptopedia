import z from "zod";
import { CreateLaptopSchema, LaptopSchema, SeedLaptopsSchema } from "./schema";
import { CreateBrandSchema, CreateBrandsSchema } from "../brands/schema";

export type Laptop = z.infer<typeof LaptopSchema>;
export type SeedLaptopsType = z.infer<typeof SeedLaptopsSchema>;
export type CreateLaptopType = z.infer<typeof CreateLaptopSchema>;

export type CreateBrandType = z.infer<typeof CreateBrandSchema>;
export type CreateBrandsType = z.infer<typeof CreateBrandsSchema>;
