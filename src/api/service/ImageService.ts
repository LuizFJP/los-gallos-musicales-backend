import { EntityRepository } from "../repository/protocols/EntityRepository";
import { CreateImageDto } from '../domain/dto/image/createImage';

export class ImageService {
  private imageRepository: EntityRepository;

  constructor(imageRepository: EntityRepository) {
    this.imageRepository = imageRepository;
  }

  public async uploadImage(createImageDto: CreateImageDto): Promise<void> {
    return await this.imageRepository.create(createImageDto);
  }

  public async downloadAllImages(): Promise<any> {
    return await this.imageRepository.findAll();
  }
}