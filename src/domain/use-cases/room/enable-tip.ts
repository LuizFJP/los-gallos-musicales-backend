import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { EnableTipUseCase } from "../../interfaces/use-cases/room/enable-tip-use-case";

export class EnableTip implements EnableTipUseCase {
  
  constructor(private roomRepository: RoomRepository) {}

    public async execute(roomName: string, tipOn: boolean): Promise<void> {
      const room = await this.roomRepository.get(roomName);
      const roomParsed = JSON.parse(room);
      roomParsed.tip.tipOn = tipOn;
      await this.roomRepository.create(roomName, JSON.stringify(roomParsed));
    }
}