import { Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { UserSchema } from "../schemas/user.schema.ts";

export class UserService {
  _collection: Collection;
  constructor(collection: Collection) {
    this._collection = collection;
  }

  addUser = async (model: UserSchema): Promise<{ _id: { "$oid": string } }> => {
    return await this._collection.insertOne(model);
  };

  getUsers = async (): Promise<UserSchema[]> => {
    return await this._collection.find();
  };

  findUser = async (id: string): Promise<UserSchema | undefined> => {
    return await this._collection.findOne({ _id: { "$oid": id } });
  };

  updateUser = async (id: string, model: UserSchema): Promise<any> => {
    return await this._collection.updateOne({ _id: { "$oid": id } }, model);
  };

  deleteUser = async (id: string): Promise<any> => {
    let user: UserSchema = await this._collection.findOne(
      { _id: { "$oid": id } },
    );
    user.isDeleted = true;
    return await this._collection.updateOne({ _id: { "$oid": id } }, user);
  };
}
