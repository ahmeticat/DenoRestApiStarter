import { UserSchema } from "../../schemas/user.schema.ts";

export class UserOut {
  _id: any;
  nameSurname: string;
  email: string;
  password: string;
  phone?: string;
  isActive: boolean;

  constructor(model: UserSchema) {
    this._id = (model as any)._id;
    this.nameSurname = model.nameSurname;
    this.email = model.username;
    this.password = model.password;
    this.isActive = model.isActive;
  }
}


