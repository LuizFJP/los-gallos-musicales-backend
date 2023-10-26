import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../../../../domain/interfaces/entities/room/room";

export class Cronometer {
  private timer: number;

  constructor(private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, private room: Room) {}

  public start(): void {
    this.timer = (this.room.roundDuration as number) * 60;;
    setInterval(() => {
      if(this.timer === 0) {
        if(this.room.breakMatch) {
          this.timer = (this.room.roundDuration as number) * 60;
          this.room.breakMatch = false;
        } else {
          this.timer = (this.room.roundInterval as number) * 60;
          this.room.breakMatch = true;
        }
      } 
      console.log(this.timer)
      this.timer--;
      this.io.in(this.room.name).emit(`cronometer`, this.timer, this.room.breakMatch);
    }, 1000);
  }
}
