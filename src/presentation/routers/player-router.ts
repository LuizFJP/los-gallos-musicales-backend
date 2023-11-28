import { Request, Response, Router } from "express";
import { SkipPlayerDrawUseCase } from "../../domain/interfaces/use-cases/player/skip-player-draw-use-case";

export function PlayerRouter(
  skipPlayerDraw: SkipPlayerDrawUseCase
) {

  const router = Router();

  router.post('/report', async (req: Request, res: Response) => {
    await skipPlayerDraw.execute(req.body.roomName, req.body.username)
    res.end();
  })

  return router;
}