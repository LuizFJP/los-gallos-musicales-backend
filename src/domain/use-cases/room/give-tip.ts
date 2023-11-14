import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GiveTipUseCase } from "../../interfaces/use-cases/room/give-tip-use-case";

export class GiveTip implements GiveTipUseCase {

  constructor (private roomRepository: RoomRepository) {}

  public async execute(room: Room, tip: string[], tipOn: boolean): Promise<void> {
    room.tip = tip;
    room.tipOn = tipOn;
    await this.roomRepository.create(room.name, JSON.stringify(room));
  }
}