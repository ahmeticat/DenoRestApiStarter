import { AuthorSchema } from "../../schemas/author.schema.ts";

export class AuthorOut {
    _id: any;
    name: string;
    isActive: boolean;

    constructor(model: AuthorSchema) {
        this._id = (model as any)._id;
        this.name = model.name;
        this.isActive = model.isActive;
    }
}
