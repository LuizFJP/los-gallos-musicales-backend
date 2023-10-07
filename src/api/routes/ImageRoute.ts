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
      const dto: CreateImageDto = {
        buffer: req.file?.buffer as Buffer,
        mimetype: req.file?.mimetype as string,
        originalname: req.file?.originalname as string,
        size: req.file?.size as number,
      }
      await this.imageController.uploadImage(dto);
      res.status(201).json({ message: "Upload realizado com sucesso." });
      res.end();
    };

    route.post("/upload", uploadMiddleware, uploadHandler);
    const downloadHandler: RequestHandler = async (
      req: Request,
      res: Response
    ) => {
      const images = JSON.stringify(await this.imageController.downloadAllImages());
      res.status(200).json(images);
    }
    route.get("/download", downloadHandler);
    return route;
  }

  getRouter(): Routes {
    return this.routes;
  }
}
