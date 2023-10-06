import { Request, RequestHandler, Response } from "express";
import { multerConfig } from "../../config/MulterConfig";
import { ImageController } from "../controller/ImageController";
import { Routes } from "./Routes";
import multer from "multer";
import { CreateImageDto } from "../domain/dto/image/createImage";
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
    route.use("/image", route);

    const uploadMiddleware = multer(multerConfig).single("file");

    const uploadHandler: RequestHandler = async (
      req: Request,
      res: Response
    ) => {
      console.log(req.file);
      const dto: CreateImageDto = {
        buffer: req.file?.buffer as Buffer,
        mimetype: req.file?.mimetype as string,
        originalname: req.file?.originalname as string,
        size: req.file?.size as number,
      }
      await this.imageController.uploadImage(dto);
      // const b64 = Buffer.from(rest.Body.toString('base64');
      // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
      // const mimeType = 'image/png'; // e.g., image/png
      
      // res.send(`<img src="data:${mimeType};base64,${b64}" />`);
      res.status(200).json({ message: "Upload realizado com sucesso." });
      res.end();
    };

    route.post("/upload", uploadMiddleware, uploadHandler);

    route.get("/download",(request: Request, response: Response) => {
        
    })
    return route;
  }

  getRouter(): Routes {
    return this.routes;
  }
}
