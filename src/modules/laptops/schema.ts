import z from "zod";

export const LaptopSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  slug: z.string(),
  cpu: z.string(),
  gpu: z.string(),
  ram: z.string(),
  storage: z.string(),
  display: z.string(),
  battery: z.string(),
  weight: z.string(),
  release_year: z.number(),
  price: z.number(),
  createdAt: z.date(),
});
export const LaptopsSchema = LaptopSchema.array();

export const CreateLaptopSchema = z.object({
  brand: z.string(),
  model: z.string(),
  cpu: z.string(),
  gpu: z.string(),
  ram: z.string(),
  storage: z.string(),
  display: z.string(),
  battery: z.string(),
  weight: z.string(),
  release_year: z.number(),
  price: z.number(),
});

export type Laptop = z.infer<typeof LaptopSchema>;
export type Laptops = z.infer<typeof LaptopsSchema>;
