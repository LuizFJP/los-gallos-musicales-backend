import { ImageRepository } from "../repository/ImageRepository";
import { ImageService } from "../service/ImageService";

export class ImageController {
  private imageService: ImageService;
  private imageRepository: ImageRepository;

	constructor() {
    this.imageRepository = new ImageRepository();
		this.imageService = new ImageService(this.imageRepository);
	}

	public async uploadImage(req: Request, res: Response): Promise<void> {
		await this.imageService.uploadImage();
	}
}