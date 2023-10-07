import { EntityRepository } from "../repository/protocols/EntityRepository";
import { CreateImageDto } from '../domain/dto/image/createImage';
import { Image } from "../domain/entities/Image";

export class ImageService {
  private imageRepository: EntityRepository;

  constructor(imageRepository: EntityRepository) {
    this.imageRepository = imageRepository;
  }

  public async uploadImage(createImageDto: CreateImageDto): Promise<void> {
    return await this.imageRepository.create(createImageDto);
  }

  public async downloadAllImages(): Promise<any> {
    const images = await this.imageRepository.findAll();
    const bufferedImages = images.map((image: Image) => {
      return {base64: Buffer.from(image.buffer).toString('base64'), mimetype: image.mimetype}
    })
    return bufferedImages;
  }
}