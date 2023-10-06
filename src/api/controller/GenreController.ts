import { Request, Response } from "express";
import { GenreService } from "../service/GenreService";

export class GenreController {
  private service: GenreService;
  
  constructor() {
    this.service = new GenreService();
  }

  public async getGenres(req: Request, res: Response): Promise<void> {
    const genres = await this.service.getGenres();
    res.json(genres);
  }
}