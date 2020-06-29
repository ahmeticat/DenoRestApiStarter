import { Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { BaseService } from "../services/base.service.ts";
import { BaseSchema } from "../schemas/base.schema.ts";
import checkType from "../dtos/checkType.ts";

export class BaseController<
  TModelSchema extends BaseSchema,
  TInputValidationSchema = any,
  TOutput = any,
  > {
  collection: Collection;
  modelSchema: new (args?: any) => TModelSchema;
  outType?: new (args?: any) => TOutput;
  validationType?: TInputValidationSchema;

  constructor(
    collection: Collection,
    inSchema: new (...args: any) => TModelSchema,
    outType?: new (...args: any) => TOutput,
    validationType?: TInputValidationSchema,
  ) {
    this.collection = collection;
    this.outType = outType;
    this.modelSchema = inSchema;
    this.validationType = validationType;
  }

  getAll = async ({ response }: { response: any }) => {
    response.body = {
      success: true,
      data: (await new BaseService(this.collection).get<TModelSchema>())
        .map((item) => this.getNewOutPut(item)),
    };
  };

  find = async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    let model: BaseSchema | undefined = await new BaseService(this.collection)
      .find(params.id);

    if (model) {
      response.status = 200;
      response.body = {
        success: true,
        data: this.getNewOutPut(model),
      };
    } else {
      response.status = 400;
      response.body = {
        success: false,
        message: "No result found",
      };
    }
  };

  add = async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data",
      };
    } else {
      if (this.validationType) {
        const [err, model] = checkType(this.validationType, body.value);
        if (err) {
          response.status = 400;
          response.body = {
            success: false,
            message: "No matched model",
          };
        } else {
          const _user: TOutput = {
            ...body.value,
            _id: await new BaseService(this.collection).add(
              this.getNewInputSchema(model),
            ),
          };

          response.status = 200;
          response.body = {
            success: true,
            data: _user,
          };
        }
      } else {
        const _user: TOutput = {
          ...body.value,
          _id: await new BaseService(this.collection).add(
            this.getNewInputSchema(body.value),
          ),
        };

        response.status = 200;
        response.body = {
          success: true,
          data: _user,
        };
      }
    }
  };

  update = async ({ params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    let requestModel: BaseSchema | undefined = await new BaseService(
      this.collection,
    ).find(params.id);

    if (requestModel) {
      const body = await request.body();
      if (!request.hasBody) {
        response.status = 400;
        response.body = {
          success: false,
          message: "No data",
        };
      } else {
        if (this.validationType) {
          const [err, model] = checkType(this.validationType, body.value);

          if (err) {
            response.status = 400;
            response.body = {
              success: false,
              message: "No matched model",
            };
          } else {
            let { modifiedCount } = await new BaseService(
              this.collection,
            ).update(params.id, this.getNewInputSchema(model));

            response.status = 200;
            response.body = {
              success: modifiedCount > 0,
              data: body.value,
            };
          }
        } else {
          let { modifiedCount } = await new BaseService(
            this.collection,
          ).update(params.id, this.getNewInputSchema(body.value));

          response.status = 200;
          response.body = {
            success: modifiedCount > 0,
            data: body.value,
          };
        }
      }
    } else {
      response.status = 400;
      response.body = {
        success: false,
        message: "Not result found",
      };
    }
  };

  delete = async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    let { modifiedCount } = await new BaseService(
      this.collection,
    ).deleteOne(
      params.id,
    );
    response.status = 200;
    response.body = {
      success: modifiedCount > 0,
      message: modifiedCount > 0 ? "Model removed" : "Model does not removed",
    };
  };

  softDelete = async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    let { modifiedCount } = await new BaseService(
      this.collection,
    ).softDeleteOne(
      params.id,
    );
    response.status = 200;
    response.body = {
      success: modifiedCount > 0,
      message: modifiedCount > 0 ? "Model removed" : "Model does not removed",
    };
  };

  private getNewOutPut(args?: any): TOutput | undefined {
    return this.outType ? new this.outType(args) : args;
  }

  private getNewInputSchema(args?: any): TModelSchema {
    return new this.modelSchema(args);
  }
}
