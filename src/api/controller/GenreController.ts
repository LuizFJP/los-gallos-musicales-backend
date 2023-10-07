import { Request, Response } from "express";
import { GenreService } from "../service/GenreService";

export class GenreController {
  private service: GenreService;
  
  constructor() {
    this.service = new GenreService();
  }

  public async getGenres(req: Request, res: Response): Promise<any> {
    return await this.service.getGenres();
  }
}