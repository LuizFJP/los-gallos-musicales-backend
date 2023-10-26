import { Router } from "express";
import { CreateRoomUseCase } from "../../domain/interfaces/use-cases/room/create-room-use-case";
import { EnterRoomUserCase } from "../../domain/interfaces/use-cases/room/enter-room-use-case";
import { GetAllRoomsUseCase } from "../../domain/interfaces/use-cases/room/get-all-rooms";
import { GetRoomUseCase } from "../../domain/interfaces/use-cases/room/get-room-use-case";


export function RoomRouter(
  createRoom: CreateRoomUseCase,
  enterRoom: EnterRoomUserCase,
  getAllRooms: GetAllRoomsUseCase,
  getRoom: GetRoomUseCase
) {

  const router = Router();

  router.post('/create', async (req, res) => {
    const room = await createRoom.execute(req.body.room);
    if (!room) {
      res.status(409).json({ error: 'Room already exists' });
    } else {
      res.status(201).json({success: `${room} created`});
    }
    res.end();
  });

  router.post('/join', async (req, res) => {
    console.log('entrou no join');
    if (!req.query.name) {
      res.end();
    } else {
      const room = await enterRoom.execute(req.query.name as string, req.body);
      res.json(room);
    }
  });

  router.get('/', async (req, res) => {
    const room = await getRoom.execute(req.query.name as string);
    res.json({ room });
  });

  router.get('/all', async (req, res) => {
    const rooms = await getAllRooms.execute();
    res.json({ rooms });
  });

  return router;
}