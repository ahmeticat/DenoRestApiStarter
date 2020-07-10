import { BookSchema } from "../../schemas/book.schema.ts";

export class BookOut {
  _id: any;
  name: string;
  author: string;
  authorId: number;
  price: number;
  isActive: boolean;

  constructor(model: BookSchema) {
    this._id = (model as any)._id.$oid;
    this.name = model.name;
    this.author = model.author;
    this.authorId = model.authorId;
    this.price = model.price;
    this.isActive = model.isActive;
  }
}
