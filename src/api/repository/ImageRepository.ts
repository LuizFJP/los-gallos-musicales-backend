import { CreateImageDto } from "../domain/dto/image/createImage";
import { EntityRepository } from "./protocols/EntityRepository";
import { ImageModel } from "../../db/mongo/schema/schemas";

export class ImageRepository implements EntityRepository {
  private imageModel: any;
  constructor() {
    this.imageModel = ImageModel;
  }

  async create(createImageDto: CreateImageDto): Promise<any> {
    try {
      return await this.imageModel.create({path: createImageDto.path});
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<any[]> {
    return await ImageModel.find();
  }

  async findById(id: string): Promise<any> {
    return await ImageModel.findById(id);
  }

  async update(id: string, updateImageDto: any): Promise<any> {
    return await ImageModel.findByIdAndUpdate(id, updateImageDto);
  }

  async delete(id: string): Promise<any> {
    return await ImageModel.findByIdAndDelete(id);
  }
}
