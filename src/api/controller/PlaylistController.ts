import { Request, Response } from "express";
import { PlaylistRepository } from "../repository/PlaylistRepository";
import { EntityRepository } from "../repository/protocols/EntityRepository";
import { PlaylistService } from "../service/PlaylistService";

export class PlaylistController {
	private playlistService: PlaylistService;
	private playlistRepository: EntityRepository;

	constructor() {
		this.playlistRepository = new PlaylistRepository();
		this.playlistService = new PlaylistService(this.playlistRepository);
	}

	public async getPlaylist(req: Request, res: Response): Promise<void> {
		const playlists = await this.playlistService.getPlaylist(req.query?.name as string);
		res.send(playlists);
	}

}

