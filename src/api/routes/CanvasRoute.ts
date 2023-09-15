import { CanvasUseCase } from "../domain/useCase/CanvasUseCase";
import { RoomUseCase } from "../domain/useCase/RoomUseCase";
import { Routes } from "./Routes";

export class CanvasRoute {
    private routes: Routes;

    constructor(routes: Routes) {
        this.routes = routes;
        this.init();
    }

    init() {
    }
}