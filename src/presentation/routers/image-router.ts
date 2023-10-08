import { Request, RequestHandler, Response, Router } from "express";
import multer from "multer";
import { multerConfig } from "../../infra/config/MulterConfig";
import { DownloadAllImagesUseCase } from "../../domain/interfaces/use-cases/image/download-all-images-use-case";
import { UploadImageUseCase } from "../../domain/interfaces/use-cases/image/upload-image-use-case";
import { CreateImageDTO } from "../../domain/dto/image/create-image-dto";

export function ImageRoute(
  downloadAllImagesUseCase: DownloadAllImagesUseCase,
  uploadImageUseCase: UploadImageUseCase
) {

  const router = Router();

  const uploadMiddleware = multer(multerConfig).single("file");

  const uploadHandler: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const dto: CreateImageDTO = {
      buffer: req.file?.buffer as Buffer,
      mimetype: req.file?.mimetype as string,
      originalname: req.file?.originalname as string,
      size: req.file?.size as number,
    }
    await uploadImageUseCase.execute(dto);
    res.status(201).json({ message: "Upload realizado com sucesso." });
    res.end();
  };

  router.post("/upload", uploadMiddleware, uploadHandler);
  const downloadHandler: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const images = JSON.stringify(await downloadAllImagesUseCase.execute());
    res.status(200).json(images);
  }
  router.get("/download", downloadHandler);
  
  return router;
}
