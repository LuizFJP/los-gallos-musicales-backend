import { Router } from "express";
import { RoomRoute } from "./RoomRoute";
import { MusicRoute } from "./MusicRoute";

export class Routes {
    private router: Router;
    private static instance: Routes;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static getInstance(): Routes {
        if (!Routes.instance) {
            Routes.instance = new Routes();
        }

        return Routes.instance;
    }

    public getRouter(): Router {
        return this.router;
    }

    async init() {
        Promise.all(
            [new MusicRoute(this),
            new RoomRoute(this)]
        )
    }
}