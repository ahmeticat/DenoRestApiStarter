import { UserSchema } from "../schemas/user.schema.ts";
import { UserInputSchema } from "../dtos/inputs/userInput.model.ts";
import { UserOut } from "../dtos/outputs/userOut.model.ts";
import { BaseController } from "./baseController.ts";

export class ExtendUserController extends BaseController<
    UserSchema,
    typeof UserInputSchema,
    UserOut
    > {
}
