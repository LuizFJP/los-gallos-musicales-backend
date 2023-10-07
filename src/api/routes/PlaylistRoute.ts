import { PlaylistController } from "../controller/PlaylistController";
import { Routes } from "./Routes";

export class PlaylistRoute {
    private routes: Routes;
    private controller: PlaylistController;

    constructor(routes: Routes) {
        this.routes = routes;
        this.controller = new PlaylistController();
        this.init();
    }

    init() {
        const route = this.routes.getRouter();
        route.use('/playlist', route);

        route.get('/', async (req, res) => {
            const playlists = await this.controller.getPlaylist(req,res);
            res.send(playlists);
        })
    }
}