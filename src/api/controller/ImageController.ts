import { CreateImageDto } from "../domain/dto/image/createImage";
import { ImageRepository } from "../repository/ImageRepository";
import { ImageService } from "../service/ImageService";

export class ImageController {
  private imageService: ImageService;
  private imageRepository: ImageRepository;

	constructor() {
    this.imageRepository = new ImageRepository();
		this.imageService = new ImageService(this.imageRepository);
	}

	public async uploadImage(createImageDto: CreateImageDto): Promise<void> {
		return await this.imageService.uploadImage(createImageDto);
	}

	public async downloadAllImages(): Promise<any> {
		return await this.imageService.downloadAllImages();
	}
}