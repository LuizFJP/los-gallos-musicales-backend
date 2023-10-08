import { Router } from "express";
import { GetPlaylistsUseCase } from "../../domain/interfaces/use-cases/playlist/get-playlists-use-case";

export function PlaylistRoute(
  getPlaylist: GetPlaylistsUseCase,
) {
  const router = Router();

  router.get('/', async (req, res) => {
    const playlists = await getPlaylist.execute(req.query?.name as string );
    res.send(playlists);
  })

  return router;
}