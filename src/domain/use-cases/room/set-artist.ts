import { Player } from "../../interfaces/entities/player/player";
import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { SetArtistUseCase } from "../../interfaces/use-cases/room/set-artist-use-case";

export class SetArtist implements SetArtistUseCase {

  constructor(private readonly roomRepository: RoomRepository) { }

  public async execute(roomName: string): Promise<Room> {
    const room = await this.roomRepository.get(roomName);
    const roomParsed = JSON.parse(room) as Room;
    if (roomParsed.players) {
      const id = roomParsed.players.findIndex((player: Player) => player.artist === true) as number;
      roomParsed.players[id].artist = false;
      const next = id + 1 === roomParsed.players.length ? 0 : id + 1;
      roomParsed.players[next].artist = true;
    }
    await this.roomRepository.create(roomName, JSON.stringify(roomParsed));
    return roomParsed;
  }

}