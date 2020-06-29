// import { BookInput } from "../dtos/inputs/bookInput.model.ts";
import { BaseSchema } from "./base.schema.ts";

export class BookSchema extends BaseSchema {
  name: string;
  author: string;
  price: number;
  constructor(model: any) {
    super();
    this.name = model.name;
    this.author = model.author;
    this.price = model.price;
  }
}
