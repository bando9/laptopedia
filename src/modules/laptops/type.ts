import z from "zod";
import { LaptopSchema, LaptopsSchema } from "./schema";

export type Laptop = z.infer<typeof LaptopSchema>;
export type Laptops = z.infer<typeof LaptopsSchema>;
