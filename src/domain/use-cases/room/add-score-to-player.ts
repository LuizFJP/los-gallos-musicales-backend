import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { AddScoreToPlayerUseCase } from "../../interfaces/use-cases/room/add-score-to-player-use-case";

export class AddScoreToPlayer implements AddScoreToPlayerUseCase {
  constructor (private roomRepository: RoomRepository) {}

  public async execute(roomName: string, username: string, score: number): Promise<Room> {
    const room = await this.roomRepository.get(roomName);
    const roomParsed = JSON.parse(room);
    const player = roomParsed.players.find((player: any) => player.username === username);
    player.score += score;
    await this.roomRepository.create(roomName, JSON.stringify(roomParsed));
    return roomParsed;
  }
}