import { UserSchema } from "../../schemas/user.schema.ts";

export class UserOut {
  id: any;
  nameSurname: string;
  email: string;
  password: string;
  phone?: string;
  isActive: boolean;

  constructor(model: UserSchema) {
    this.id = (model as any)._id.$oid;
    this.nameSurname = model.nameSurname;
    this.email = model.username;
    this.password = model.password;
    this.isActive = model.isActive;
  }
}


