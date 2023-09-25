import { Request, Response } from "express";
import { MusicService } from "../service/MusicService";

export class MusicController {
  private service: MusicService;
  
  constructor() {
    this.service = new MusicService();
  }

  public async getSong(req: Request, res: Response): Promise<void> {
    const music = await this.service.getSong(req.query.name as string);
    res.json(music);
  }
}