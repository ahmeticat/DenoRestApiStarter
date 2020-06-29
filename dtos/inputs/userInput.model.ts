import Schema, {
  string
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

const UserInputSchema = Schema({
  email: string,
  password: string,
  nameSurname: string,
  phone: string.optional(),
});

export { UserInputSchema };
