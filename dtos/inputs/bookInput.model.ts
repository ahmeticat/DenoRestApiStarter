import Schema, {
  string, number
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

const BookInputSchema = Schema({
  name: string,
  author: string,
  price: number.optional(),
});

export { BookInputSchema };
