import { Request, Response, Router } from "express";
import { SkipPlayerDrawUseCase } from "../../domain/interfaces/use-cases/player/skip-player-draw-use-case";
import { SetArtistUseCase } from "../../domain/interfaces/use-cases/room/set-artist-use-case";

export function PlayerRouter(
  skipPlayerDraw: SkipPlayerDrawUseCase,
  setArtist: SetArtistUseCase
) {

  const router = Router();

  router.post('/report', async (req: Request, res: Response) => {
    const isSkipped = await skipPlayerDraw.execute(req.body.roomName, req.body.username)
    if(isSkipped) {
      await setArtist.execute(req.body.roomName);
    }
    res.end();
  })

  return router;
}