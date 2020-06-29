import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/productController.ts";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "./controllers/userController.ts";
import { userCollection, bookCollection } from "./db/_db.ts";
import { BookController } from "./controllers/bookController.ts";
import { ExtendUserController } from "./controllers/extendUserController.ts";
import { UserOut } from "./dtos/outputs/userOut.model.ts";
import { UserSchema } from "./schemas/user.schema.ts";
import { UserInputSchema } from "./dtos/inputs/userInput.model.ts";
import { BookSchema } from "./schemas/book.schema.ts";
import { BookOut } from "./dtos/outputs/bookOut.model.ts";
import { BookInputSchema } from "./dtos/inputs/bookInput.model.ts";

const router = new Router();

router.prefix("/api/v1");
router
  .get("/products", getProducts)
  .get("/products/:id", getProduct)
  .post("/products", addProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

router
  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .post("/users", addUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

router
  .get("/extendUser", new ExtendUserController(userCollection, UserSchema, UserOut, UserInputSchema).getAll)
  .post("/extendUser", new ExtendUserController(userCollection, UserSchema, UserOut, UserInputSchema).add)
  .put("/extendUser", new ExtendUserController(userCollection, UserSchema, UserOut, UserInputSchema).add);

router
  .get(
    "/books",
    new BookController(bookCollection, BookSchema, BookOut, BookInputSchema)
      .getAll
  )
  .post(
    "/books",
    new BookController(bookCollection, BookSchema, BookOut, BookInputSchema).add
  );



  
export default router;
