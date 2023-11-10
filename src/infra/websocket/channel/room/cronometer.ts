import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../../../../domain/interfaces/entities/room/room";
import { SetArtistUseCase } from "../../../../domain/interfaces/use-cases/room/set-artist-use-case";
import { ChooseSongRoomUseCase } from "../../../../domain/interfaces/use-cases/room/choose-song-room-use-case";

export class Cronometer {
  private timer: number;

  constructor(private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    private room: Room,
    private setArtistUseCase: SetArtistUseCase,
    private chooseSongRoomUseCase: ChooseSongRoomUseCase) { }

  public start(): void {
    this.timer = (this.room.roundDuration as number) * 60;
    setInterval(async () => {
      if (this.timer === 0) {
        if (this.room.breakMatch) {
          this.timer = (this.room.roundDuration as number) * 60;
          this.room.breakMatch = false;
        } else {
          // this.timer = (this.room.roundInterval as number) * 60;
          this.timer = 5;
          this.room.breakMatch = true;
          const roomPlayersUpdated = await this.setArtistUseCase.execute(this.room.name);
          const song = await this.chooseSongRoomUseCase.execute(this.room.name);
          this.io.in(this.room.name).emit(`update-players`, roomPlayersUpdated);
          this.io.in(this.room.name).emit(`update-song`, song);
        }
      }
      this.timer--;
      this.io.in(this.room.name).emit(`cronometer`, this.timer, this.room.breakMatch);
    }, 1000);
  }
}
