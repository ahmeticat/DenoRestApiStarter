import { BaseSchema } from "./base.schema.ts";
export class AuthorSchema extends BaseSchema {
    name: string;

    constructor(model: any) {
        super();
        this.name = model.name;
    }
}
