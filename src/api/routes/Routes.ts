import { Router } from "express";
import { RoomRoute } from "./RoomRoute";
import { ImageRoute } from "./ImageRoute";
import { GenreRoute } from "./GenreRoute";
import { PlaylistRoute } from "./PlaylistRoute";

export class Routes {
  private router: Router;
  private static instance: Routes;

  constructor() {
    this.router = Router();
    this.init();
  }

  public static getInstance(): Routes {
    if (!Routes.instance) {
      Routes.instance = new Routes();
    }

    return Routes.instance;
  }

  public getRouter(): Router {
    return this.router;
  }

  async init() {
    Promise.all([
      new GenreRoute(this),
      new PlaylistRoute(this),
      new RoomRoute(this),
      new ImageRoute(this),
    ]);
  }
}
