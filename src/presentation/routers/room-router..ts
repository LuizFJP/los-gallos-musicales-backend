import { Router } from "express";
import { CreateRoomUseCase } from "../../domain/interfaces/use-cases/room/create-room-use-case";
import { EnterRoomUserCase } from "../../domain/interfaces/use-cases/room/enter-room-use-case";
import { GetAllRoomsUseCase } from "../../domain/interfaces/use-cases/room/get-all-rooms";

export function RoomRouter(
  createRoom: CreateRoomUseCase,
  enterRoom: EnterRoomUserCase,
  getAllRooms: GetAllRoomsUseCase
) {

  const router = Router();

  router.post('/create', async (req, res) => {
    await createRoom.execute(req.body.room);
    res.end();
  });

  router.post('/join', async (req, res) => {
    if (!req.query.name) {
			res.end();
		} else {
			const room = await enterRoom.execute(req.query.name as string, req.body);
			res.json(room);
		}
  });

  router.get('/all', async (req, res) => {
    const rooms = await getAllRooms.execute();
    res.json({ rooms });
  });

  return router;
}