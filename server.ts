import { Application } from "https://deno.land/x/oak/mod.ts";
import { DenoRouter } from "./routes/deno.routes.ts";
import { ExtendUserController } from "./controllers/extendUserController.ts";
import { userCollection, bookCollection, authorCollection } from "./db/_db.ts";
import { UserSchema } from "./schemas/user.schema.ts";
import { UserOut } from "./dtos/outputs/userOut.model.ts";
import { UserInputSchema } from "./dtos/inputs/userInput.model.ts";
import { BookController } from "./controllers/bookController.ts";
import { BookSchema } from "./schemas/book.schema.ts";
import { BookOut } from "./dtos/outputs/bookOut.model.ts";
import { BookInputSchema } from "./dtos/inputs/bookInput.model.ts";
import { AuthorController } from "./controllers/authorController.ts";
import { AuthorSchema } from "./schemas/author.schema.ts";
import { AuthorOut } from "./dtos/outputs/authorOut.model.ts";
import { AuthorInputSchema } from "./dtos/inputs/authorInput.model.ts";

const port = Deno.env.get('PORT') || 5000;
const app = new Application();


let denoRouter = new DenoRouter(
    [
        {
            controller: new ExtendUserController(userCollection, UserSchema, UserOut, UserInputSchema),
            methods: {
                get: true,
                getForFind: 'find',
                post: 'add'
            },
            name: '',
            path: '/api/v1/users'
        }, {
            controller: new BookController(bookCollection, BookSchema, BookOut, BookInputSchema),
            methods: {
                get: 'getAll',
                getForFind: 'find',
                post: 'add'
            },
            name: '',
            path: '/api/v1/books'
        }, {
            controller: new AuthorController(authorCollection, AuthorSchema, AuthorOut, AuthorInputSchema),
            methods: {
                get: true,
                getForFind: true,
                post: true
            },
            name: '',
            path: '/api/v1/authors'
        }
    ]
);

app.use(denoRouter.router.routes());
app.use(denoRouter.router.allowedMethods());

console.log(`server running on port ${port}`);

await app.listen({ port: +port });
