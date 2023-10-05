import { Redis } from "../../db/Redis";
import { Room } from "../domain/entities/Room";
import { Player } from "../domain/entities/User";
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

  public async enterRoom(name: string, player: Player): Promise<string | null> {
    console.log(player);
    await this.useCase.savePlayer(player, name);
    await this.useCase.incrementPlayerCount(name);
    return await this.useCase.enterRoom(name);
  }

  public async getAllRoom(): Promise<string[]> {
    return await this.useCase.getAllRooms();
  }
}