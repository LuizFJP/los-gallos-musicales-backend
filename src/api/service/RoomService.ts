import { Redis } from "../../db/Redis";
import { Room } from "../domain/entities/Room";
import { RoomUseCase } from "../domain/useCase/RoomUseCase";

export class RoomService {
  private useCase: RoomUseCase;

  constructor() {
    console.log(Redis.getInstance().getClient);
    this.useCase = new RoomUseCase(Redis.getInstance().getClient());
  }

  public async createRoom(room: Room): Promise<void> {
    console.log(room)
    await this.useCase.createRoom(room);
    console.log(room.name + " created");
    return;
  }

  public async enterRoom(name: string): Promise<string | null> {
    return await this.useCase.enterRoom(name);
  }

  public async getAllRoom(): Promise<string[]> {
    return await this.useCase.getAllRooms();
  }
}