import { Router } from "express";
import { CanvasRoute } from "./CanvasRoute";
import { RoomRoute } from "./RoomRoute";

export class Routes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    init() {
        new CanvasRoute(this);
        new RoomRoute(this);
    }
}