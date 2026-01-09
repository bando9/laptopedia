import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL || "",
});

await client.connect();

type LaptopType = {
  id: number;
  brand: number;
  model: string;
  slug: string;
};

try {
  const result = await client.query("SELECT * FROM laptop");
  const laptops: LaptopType[] = result.rows;
  console.log({ laptops });
} catch (error) {
  console.error("Failed to connect to the database", error);
} finally {
  await client.end();
}
