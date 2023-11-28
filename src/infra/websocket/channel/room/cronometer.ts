import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../../../../domain/interfaces/entities/room/room";
import { SetArtistUseCase } from "../../../../domain/interfaces/use-cases/room/set-artist-use-case";
import { ChooseSongRoomUseCase } from "../../../../domain/interfaces/use-cases/room/choose-song-room-use-case";
import { SkipPlayerDrawUseCase } from "../../../../domain/interfaces/use-cases/player/skip-player-draw-use-case";

export class Cronometer {
  private timer: number;
  private intervalId: NodeJS.Timeout;
  constructor(private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    private room: Room,
    private setArtistUseCase: SetArtistUseCase,
    private chooseSongRoomUseCase: ChooseSongRoomUseCase, 
    private readonly skipPlayerDraw: SkipPlayerDrawUseCase) { }

  public start(): void {
    this.timer = (parseFloat(this.room.roundDuration as string)) * 60;
    this.intervalId = setInterval(async () => {
      if (this.timer === 0) {
        if (this.room.breakMatch) {
          this.timer = (parseFloat(this.room.roundDuration as string)) * 60;
          this.room.breakMatch = false;
        } else {
          this.timer = parseInt(this.room.roundInterval as string);
          this.room.breakMatch = true;
          try {
            await this.updateRoomStats();
          } catch(error) {
            clearInterval(this.intervalId);
          }
        }
      }
      this.timer--;
      this.io.in(this.room.name).emit(`cronometer`, this.timer, this.room.breakMatch);
    }, 1000);
  }

  public skipMatch() {
    this.skipPlayerDraw.execute(this.room.name, "joao");
    this.timer = 0;
    this.io.in(this.room.name).emit(`cronometer`, this.timer, this.room.breakMatch);
    clearInterval(this.intervalId);
    this.start();
  }

  private async updateRoomStats() {
    const roomPlayersUpdated = await this.setArtistUseCase.execute(this.room.name);
    const roomSongUpdated    = await this.chooseSongRoomUseCase.execute(roomPlayersUpdated);
    this.io.in(this.room.name).emit(`update-players`, roomSongUpdated);
    this.io.in(this.room.name).emit(`update-song`, roomSongUpdated.song);
    this.io.in(this.room.name).emit(`tip`, roomSongUpdated.tip, roomSongUpdated?.tip?.numberOfTips, roomSongUpdated?.tip?.tipOn);
  }
}
