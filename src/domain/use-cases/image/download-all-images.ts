import { Image } from "../../interfaces/entities/image/image";
import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { DownloadAllImagesUseCase } from "../../interfaces/use-cases/image/download-all-images-use-case";

export class DownloadAllImages implements DownloadAllImagesUseCase {
  constructor(private readonly imageRepository: ImageRepository) { }

  public async execute(): Promise<any> {
    const images = await this.imageRepository.findAll();
    const bufferedImages = images.map((image: Image) => {
      return {base64: Buffer.from(image.buffer).toString('base64'), mimetype: image.mimetype}
    })
    return bufferedImages;
  }
}