import { EntityRepository } from "../repository/protocols/EntityRepository";

export class ImageService {
  private imageRepository: EntityRepository;

  constructor(imageRepository: EntityRepository) {
    this.imageRepository = imageRepository;
  }

  public async uploadImage(imagePath: string): Promise<void> {
    await this.imageRepository.create({ path: imagePath });
  }

  public async downloadAllImages(): Promise<any> {
    return await this.imageRepository.findAll();
  }
}