import { BaseController } from "./baseController.ts";
import { BookSchema } from "../schemas/book.schema.ts";
import { BookInputSchema } from "../dtos/inputs/bookInput.model.ts";
import { BookOut } from "../dtos/outputs/bookOut.model.ts";

export class BookController extends BaseController<
  BookSchema,
  typeof BookInputSchema,
  BookOut
  > {
}
