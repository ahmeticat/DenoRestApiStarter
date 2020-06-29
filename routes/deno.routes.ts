import { Router } from "https://deno.land/x/oak/mod.ts";
import { DenoControllers } from "./routes.settings.ts";


export class DenoRouter {
    router = new Router();
    denoControllers: DenoControllers[];
    constructor(denoControllers: DenoControllers[]) {
        this.denoControllers = denoControllers;
        this.generateRoutes();
    }

    private generateRoutes() {
        this.denoControllers.forEach((currentController) => {
            if (currentController.methods.get) {
                if (currentController.methods.get === true) {
                    this.router.get(`${currentController.path}`, currentController.controller.getAll);
                } else {
                    this.router.get(`${currentController.path}/${currentController.methods.get}`, currentController.controller.getAll);
                }
            }
            if (currentController.methods.getForFind) {
                if (currentController.methods.getForFind === true) {
                    this.router.get(`${currentController.path}/:id`, currentController.controller.find);
                } else {
                    this.router.get(`${currentController.path}/${currentController.methods.getForFind}/:id`, currentController.controller.find);
                }
            }
            if (currentController.methods.post) {
                if (currentController.methods.getForFind === true) {
                    this.router.post(`${currentController.path}`, currentController.controller.add);
                } else {
                    this.router.post(`${currentController.path}/${currentController.methods.post}`, currentController.controller.add);
                }
            }
            if (currentController.methods.put) {
                if (currentController.methods.getForFind === true) {
                    this.router.put(`${currentController.path}/:id`, currentController.controller.update);
                } else {
                    this.router.put(`${currentController.path}/${currentController.methods.put}/:id`, currentController.controller.update);
                }
            }
            if (currentController.methods.delete) {
                if (currentController.methods.getForFind === true) {
                    this.router.delete(`${currentController.path}/:id`, currentController.controller.delete);
                } else {
                    this.router.delete(`${currentController.path}/${currentController.methods.delete}/:id`, currentController.controller.delete);
                }
            }
        });
    }
}
