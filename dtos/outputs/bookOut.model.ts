import { BookSchema } from "../../schemas/book.schema.ts";

export class BookOut {
  _id: any;
  name: string;
  author: string;
  price: number;
  isActive: boolean;

  constructor(model: BookSchema) {
    this._id = (model as any)._id;
    this.name = model.name;
    this.author = model.author;
    this.price = model.price;
    this.isActive = model.isActive;
  }
}
