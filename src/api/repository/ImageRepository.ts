import { CreateImageDto } from "../domain/dto/image/createImage";
import { PrismaService } from "../service/PrismaService";
import { EntityRepository } from "./protocols/EntityRepository";

export class ImageRepository implements EntityRepository {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }
  create(createImageDto: CreateImageDto): Promise<any> {
    return this.prismaService.image.create({
      data: createImageDto,
    });
  }
  findAll(): Promise<any[]> {
    return this.prismaService.image.findMany();
  }
  findById(id: string): Promise<any> {
    return this.prismaService.image.findUniqueOrThrow({
      where: { id },
    });
  }
  update(id: string, updateImageDto: any): Promise<any> {
    throw new Error("You can not update a image");
  }
  delete(id: string): Promise<any> {
    return this.prismaService.image.delete({
      where: { id },
    });
  }
}
