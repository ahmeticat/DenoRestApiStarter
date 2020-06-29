import { UserService } from "../services/user.service.ts";
import { userCollection } from "../db/_db.ts";
import { UserOut } from "../dtos/outputs/userOut.model.ts";
import { UserInputSchema } from "../dtos/inputs/userInput.model.ts";
import checkType from "../dtos/checkType.ts";
import { UserSchema } from "../schemas/user.schema.ts";

const getUsers = async ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: ((await new UserService(userCollection).getUsers()) as UserSchema[])
      .map((item) => new UserOut(item)),
  };
};

const getUser = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  let user: UserSchema | undefined = await new UserService(userCollection)
    .findUser(params.id);

  if (user) {
    response.status = 200;
    response.body = {
      success: true,
      data: new UserOut(user),
    };
  } else {
    response.status = 400;
    response.body = {
      success: false,
      message: "No result found",
    };
  }
};

const addUser = async (
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
    const [err, user] = checkType(UserInputSchema, body.value);
    if (err) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No matched model",
      };
    } else {
      const _user: UserOut = {
        ...body.value,
        _id: await new UserService(userCollection).addUser(
          new UserSchema(user),
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

const updateUser = async ({ params, request, response }: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  let requestUser: UserSchema | undefined = await new UserService(
    userCollection,
  ).findUser(params.id);

  if (requestUser) {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data",
      };
    } else {
      const [err, user] = checkType(UserInputSchema, body.value);

      if (err) {
        response.status = 400;
        response.body = {
          success: false,
          message: "No matched model",
        };
      } else {
        let { modifiedCount } = await new UserService(
          userCollection,
        ).updateUser(params.id, new UserSchema(user));

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

const deleteUser = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  let { modifiedCount } = await new UserService(
    userCollection,
  ).deleteUser(
    params.id,
  );
  response.status = 200;
  response.body = {
    success: modifiedCount > 0,
    message: modifiedCount > 0 ? "User removed" : "User does not removed",
  };
};

export { getUsers, getUser, addUser, updateUser, deleteUser };
