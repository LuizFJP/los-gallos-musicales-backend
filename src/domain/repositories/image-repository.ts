import { imageModel } from "../../infra/data/interfaces/data-sources/mongodb/schemas";
import { CreateImageDTO } from "../dto/image/create-image-dto";
import { ImageRepository } from "../interfaces/repositories/image-repository";

export class ImageRepositoryImpl implements ImageRepository {

  constructor(){}

  public async create(createImageDTO: CreateImageDTO): Promise<any> {
    try {
      return await imageModel.create(createImageDTO);
    } catch (error) {
      console.log(error);
    }
  }
  
  public async findAll(): Promise<any[]> {
    return await imageModel.find();
  }
  
  public async findById(id: string): Promise<any> {
    return await imageModel.findById(id);
  }
  
  public async update(id: string, updateImageDTO: any): Promise<any> {
    return await imageModel.findByIdAndUpdate(id, updateImageDTO);
  }
  
  public async delete(id: string): Promise<any> {
    return await imageModel.findByIdAndDelete(id);
  }
}