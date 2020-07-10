import { BaseController } from "./baseController.ts";
import { AuthorSchema } from "../schemas/author.schema.ts";
import { AuthorInputSchema } from "../dtos/inputs/authorInput.model.ts";
import { AuthorOut } from "../dtos/outputs/authorOut.model.ts";

export class AuthorController extends BaseController<
  AuthorSchema,
  typeof AuthorInputSchema,
  AuthorOut
  > {
}
