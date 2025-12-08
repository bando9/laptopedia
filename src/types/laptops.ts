export type Laptop = {
  id: string;
  brand: string;
  model: string;
  slug: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  weight: string;
  release_year: number;
  price: number;
};

export type Laptops = Laptop[];
