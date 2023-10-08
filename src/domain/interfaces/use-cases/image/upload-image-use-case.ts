import { CreateImageDTO } from "../../../dto/image/create-image-dto";

export interface UploadImageUseCase {
  execute(image: CreateImageDTO): Promise<void>;
}