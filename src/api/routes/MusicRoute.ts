import { MusicController } from "../controller/MusicController";
import { Routes } from "./Routes";

export class MusicRoute {
    private routes: Routes;
    private controller: MusicController;

    constructor(routes: Routes) {
        this.routes = routes;
        this.controller = new MusicController();
        this.init();
    }

    init() {
        const route = this.routes.getRouter();
        route.use('/song', route);

        route.get('/', async (req, res) => {
            await this.controller.getSong(req,res);
        })
    }
}