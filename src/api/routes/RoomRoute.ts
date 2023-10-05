import { RoomController } from "../controller/RoomController";
import { Routes } from "./Routes";

export class RoomRoute {
    private routes: Routes;
    private controller: RoomController;

    constructor(routes: Routes) {
        this.routes = routes;
        this.controller = new RoomController();
        this.init();
    }

    init() {
        const route = this.routes.getRouter();
        route.use('/room', route);

        route.post('/create', async (req, res) => {
            console.log(req.body);

            await this.controller.createRoom(req,res);
        })

        route.post('/join', async (req, res) => {
            await this.controller.enterRoom(req, res);
        })

        route.get('/all', async (req, res) => {
            console.log(req);
            await this.controller.getAllRoom(req, res);
        })
    }
    
    getRouter(): Routes {
        return this.routes;
    }
}