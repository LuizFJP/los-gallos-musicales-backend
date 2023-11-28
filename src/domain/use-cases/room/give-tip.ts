import { Room } from "../../interfaces/entities/room/room";
import { Tip } from "../../interfaces/entities/room/tip";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GiveTipUseCase } from "../../interfaces/use-cases/room/give-tip-use-case";

export class GiveTip implements GiveTipUseCase {

  constructor(private roomRepository: RoomRepository) { }

  public async execute(room: Room, tip: string[], tipOn: boolean): Promise<void> {

    (room.tip as Tip).tips = tip;
    (room.tip as Tip).tipOn = tipOn;
    await this.roomRepository.create(room.name, JSON.stringify(room));

  }
}