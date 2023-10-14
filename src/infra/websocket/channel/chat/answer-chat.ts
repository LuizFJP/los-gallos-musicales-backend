import { Websocket } from "../../websocket";
import { Room as RoomType } from "../../../../domain/interfaces/entities/room/room";
import { CacheDatabase } from "../../../../infra/data/interfaces/cache-database";

export class AnswerChat {
  constructor(
    private websocket: Websocket,
    private roomName: string,
    private cacheDataBase: CacheDatabase
  ) {
  }

  public listen(): void {
    this.websocket.getIo()?.on("connection", (socket) => {
      socket.join(this.roomName);
      console.log("a user connected");
      socket.on(`${this.roomName} draw`, async (data: any) => {
        await socket.to(this.roomName).emit(`${this.roomName} draw`, data);
      });

      socket.on(`${this.roomName} save`, async (room: RoomType) => {
        const newRoom = { ...room, canvas: room.canvas };

        const roomStringfied = JSON.stringify(newRoom);
        const roomBuffered = Buffer.from(roomStringfied).toString("base64");
        await this.cacheDataBase.save(this.roomName, roomBuffered);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}
