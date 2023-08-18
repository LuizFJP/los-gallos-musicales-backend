import { CanvasUseCase } from "../useCase/CanvasUseCase";
import { RoomUseCase } from "../useCase/RoomUseCase";
import { Routes } from "./Routes";

export class CanvasRoute {
    private routes: Routes;

    constructor(routes: Routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        const route = this.routes.getRouter();

        route.get('/', async (req, res) => {
            const data = await CanvasUseCase.getCanvas();
            res.json({ img: data });
        })

        route.post('/create', async (req, res) => {
            console.log(req.body);

            await RoomUseCase.createRoom(req.body.room);
        })
    }
}