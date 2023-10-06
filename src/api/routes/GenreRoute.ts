import { GenreController } from "../controller/GenreController";
import { Routes } from "./Routes";

export class GenreRoute {
    private routes: Routes;
    private controller: GenreController;

    constructor(routes: Routes) {
        this.routes = routes;
        this.controller = new GenreController();
        this.init();
    }

    init() {
        const route = this.routes.getRouter();
        route.use('/genre', route);

        route.get('/all', async (req, res) => {
            await this.controller.getGenres(req,res);
        })
    }
}