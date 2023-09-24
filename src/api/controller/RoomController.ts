import { Request, Response } from "express";
import { RoomService } from "../service/RoomService";

export class RoomController {
	private service: RoomService;

	constructor() {
		this.service = new RoomService();
	}

	public async createRoom(req: Request, res: Response): Promise<void> {
		await this.service.createRoom(req.body.room);
		res.end();
	}

	public async enterRoom(req: Request, res: Response): Promise<void> {
		if (!req.query.name) {
			res.end();
		} else {
			const room = await this.service.enterRoom(req.query.name as string);
			res.json(room);
		}
	}

	public async getAllRoom(req: Request, res: Response): Promise<void> {
		const rooms = await this.service.getAllRoom();
		res.json({rooms});
	}
}