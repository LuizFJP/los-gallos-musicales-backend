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

        route.get('genre/all', async (req, res) => {
            const genres = await this.controller.getGenres();
            res.json(genres);
        })
    }
}