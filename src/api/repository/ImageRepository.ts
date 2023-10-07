import { imageModel } from "../../db/mongo/schema/schemas";
import { CreateImageDto } from "../domain/dto/image/createImage";
import { EntityRepository } from "./protocols/EntityRepository";

export class ImageRepository implements EntityRepository {
  constructor() { }

  async create(createImageDto: CreateImageDto): Promise<any> {
    try {
      return await imageModel.create(createImageDto);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<any[]> {
    return await imageModel.find();
  }

  async findById(id: string): Promise<any> {
    return await imageModel.findById(id);
  }

  async update(id: string, updateImageDto: any): Promise<any> {
    return await imageModel.findByIdAndUpdate(id, updateImageDto);
  }

  async delete(id: string): Promise<any> {
    return await imageModel.findByIdAndDelete(id);
  }

  findByName(getByName: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
