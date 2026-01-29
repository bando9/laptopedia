import slugify from "slugify";

export function generatedSlug({
  brand,
  model,
}: {
  brand: string;
  model: string;
}) {
  return slugify(`${brand.toLowerCase()} ${model.toLowerCase()}`);
}
