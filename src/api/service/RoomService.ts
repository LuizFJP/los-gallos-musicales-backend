import { Redis } from "../../db/Redis";
import { RoomUseCase } from "../domain/useCase/RoomUseCase";

export class RoomService {
  private useCase: RoomUseCase;

  constructor() {
    console.log(Redis.getInstance().getClient);
    this.useCase = new RoomUseCase(Redis.getInstance().getClient());
  }

  public async createRoom(name: string): Promise<void> {
    await this.useCase.createRoom(name);
    console.log(name + "created");
    return;
  }

  public async enterRoom(name: string): Promise<string | null> {
    return await this.useCase.enterRoom(name);
  }
}