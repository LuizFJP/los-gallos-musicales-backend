import { CreateImageDTO } from "../../dto/image/create-image-dto";

export interface ImageRepository {
  create(createImageDTO: CreateImageDTO): Promise<any>;
  findAll(): Promise<any>;
  findById(id: string): Promise<any>;
  update(id: string, updateImageDTO: any): Promise<any>;
  delete(id: string): Promise<any>;
}