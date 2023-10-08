import { CreateImageDTO } from "../../dto/image/create-image-dto";
import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { UploadImageUseCase } from "../../interfaces/use-cases/image/upload-image-use-case";

export class UploadImage implements UploadImageUseCase {
  constructor(private readonly imageRepository: ImageRepository) {}
  
  public async execute(image: CreateImageDTO): Promise<void> {
    await this.imageRepository.create(image);
    return Promise.resolve();
  }
  
}