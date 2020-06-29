import { BaseController } from "../controllers/baseController.ts";

export interface DenoMethodPaths {
    post?: string | boolean;
    put?: string | boolean;
    get?: string | boolean;
    getForFind?: string | boolean;
    patch?: string | boolean;
    delete?: string | boolean;
}

export interface DenoControllers {
    name: string;
    path: string;
    methods: DenoMethodPaths;
    controller: BaseController<any>;
}
