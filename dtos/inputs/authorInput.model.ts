import Schema, {
    string
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

const AuthorInputSchema = Schema({
    name: string
});

export { AuthorInputSchema };
