import { BaseSchema } from "./base.schema.ts";

export class UserSchema extends BaseSchema {
  username: string;
  password: string;
  nameSurname: string;
  phone: string;

  constructor(model: any) {
    super();
    this.username = model.email;
    this.nameSurname = model.nameSurname;
    this.password = model.password;
    this.phone = model.phone ? model.phone : "";
  }
}
