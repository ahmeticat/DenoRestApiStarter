import { Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { BaseSchema } from "../schemas/base.schema.ts";

export class BaseService {
  _collection: Collection;
  constructor(collection: Collection) {
    this._collection = collection;
  }

  add = async (model: BaseSchema): Promise<{ _id: { "$oid": string } }> => {
    return await this._collection.insertOne(model);
  };

  get = async <T>(): Promise<T[]> => {
    return await this._collection.find();
  };

  find = async (id: string): Promise<BaseSchema | undefined> => {
    return await this._collection.findOne({ _id: { "$oid": id } });
  };

  update = async (id: string, model: BaseSchema): Promise<any> => {
    return await this._collection.updateOne({ _id: { "$oid": id } }, model);
  };

  deleteOne = async (id: string): Promise<any> => {
    return await this._collection.deleteOne({ _id: { "$oid": id } });
  };

  softDeleteOne = async (id: string): Promise<any> => {
    let model: BaseSchema = await this._collection.findOne(
      { _id: { "$oid": id } },
    );
    model.isDeleted = true;
    return await this._collection.updateOne({ _id: { "$oid": id } }, model);
  };
}
