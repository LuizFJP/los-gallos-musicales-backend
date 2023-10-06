import { ImageController } from "../controller/ImageController";
import { Routes } from "./Routes";
import multer from 'multer';

export class ImageRoute {
    private routes: Routes;
    private imageController: ImageController;

    constructor(routes: Routes) {
        this.routes = routes;
        this.imageController = new ImageController();
        this.init();
    }

    init() {
        const route = this.routes.getRouter();
        route.use('/image', route);

        route.post('/upload',multer(multer) ,async (req, res) => {
            console.log(req.body);

            await this.imageController.uploadImage();
        })

   getRouter(): Routes {
        return this.routes;
    }
}