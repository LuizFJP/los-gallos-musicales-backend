import { Router } from "express";
import { CreateRoomUseCase } from "../../domain/interfaces/use-cases/room/create-room-use-case";
import { EnterRoomUserCase } from "../../domain/interfaces/use-cases/room/enter-room-use-case";
import { GetAllRoomsUseCase } from "../../domain/interfaces/use-cases/room/get-all-rooms";
import { Websocket } from "../../infra/websocket/websocket";
import { SavePlayerInRoom } from "../../domain/use-cases/room/save-player-in-room";
import { SavePlayerInRoomUseCase } from "../../domain/interfaces/use-cases/room/save-player-in-room-use-case";

export function RoomRouter(
  websocket: Websocket,
  createRoom: CreateRoomUseCase,
  enterRoom: EnterRoomUserCase,
  getAllRooms: GetAllRoomsUseCase,
  savePlayerInRoom: SavePlayerInRoomUseCase
) {

  const router = Router();

  router.post('/create', async (req, res) => {
    const room = await createRoom.execute(req.body.room);
    websocket.createRoomChannel(room);
    res.end();
  });

  router.post('/join', async (req, res) => {
    console.log('entrou no join');
    if (!req.query.name) {
			res.end();
		} else {
			const room = await enterRoom.execute(req.query.name as string);
      await savePlayerInRoom.execute(req.query.name as string, req.body);
			res.json(room);
		}
  });

  router.get('/all', async (req, res) => {
    const rooms = await getAllRooms.execute();
    res.json({ rooms });
  });

  return router;
}