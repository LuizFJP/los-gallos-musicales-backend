import { Request, Response, Router } from "express";
import { CreateRoomUseCase } from "../../domain/interfaces/use-cases/room/create-room-use-case";
import { EnterRoomUserCase } from "../../domain/interfaces/use-cases/room/enter-room-use-case";
import { GetAllRoomsUseCase } from "../../domain/interfaces/use-cases/room/get-all-rooms";
import { GetRoomUseCase } from "../../domain/interfaces/use-cases/room/get-room-use-case";
import { CheckRoomIsFullUseCase } from "../../domain/interfaces/use-cases/room/check-room-is-full-use-case";
import { GetAllRoomData } from "../../domain/use-cases/room/get-all-room-data";
import { ShareRoomUseCase } from "../../domain/interfaces/use-cases/room/share-room-use-case";
import { GetRoomByShortIdUseCase } from "../../domain/interfaces/use-cases/room/get-room-by-shortid-use-case";



export function RoomRouter(
  createRoom: CreateRoomUseCase,
  enterRoom: EnterRoomUserCase,
  getAllRooms: GetAllRoomsUseCase,
  getRoom: GetRoomUseCase,
  checkRoomIsFull: CheckRoomIsFullUseCase,
  getAllRoomData: GetAllRoomData,
  shareRoom: ShareRoomUseCase,
  getRoomByShortId: GetRoomByShortIdUseCase
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

  router.get('/check-full', async (req, res) => {
    const isFull = await checkRoomIsFull.execute(req.query.name as string);
    res.json({ isFull });
  });

  router.get('/all-data', async (req, res) => {
    const rooms = await getAllRoomData.execute();
    res.json({ rooms });
  });

  router.post('/share', async (req: Request, res: Response) => {
    const roomShortId = await shareRoom.execute(req.query.name as string);
    res.json(roomShortId);
  })

  router.get('/share', async (req: Request, res: Response) => {
    const room = await getRoomByShortId.execute(req.query.shortId as string);
    res.json(room);
  })

  return router;
}