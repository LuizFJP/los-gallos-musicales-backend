import { SongDTO } from "../../dto/playlist/song";
import { Room } from "../../interfaces/entities/room/room";
import { Tip } from "../../interfaces/entities/room/tip";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { ChooseSongRoomUseCase } from "../../interfaces/use-cases/room/choose-song-room-use-case";

export class ChooseSongRoom implements ChooseSongRoomUseCase {
  constructor(private roomRepository: RoomRepository) { }

  public async execute(room: Room): Promise<Room> {

    let song: SongDTO;
    let index: number;
    if ((room.listSongs as SongDTO[]).length <= 1) {
      index = 0;
      song = (room.listSongs as SongDTO[])[index];
    } else {
      index = Math.floor(Math.random() * (room.listSongs as SongDTO[]).length - 1);
      song = (room.listSongs as SongDTO[])[index];
    }

    room.listSongs = room?.listSongs?.filter(
      (_song: SongDTO, indexSong: number) => indexSong !== index);
    room.canvas = "";
    room.song = song;

    (room.tip as Tip).numberOfTips = Math.ceil(room.song.name.length * 0.25);
    (room.tip as Tip).tipOn = false;
    (room.tip as Tip).tips = new Array(room.song.name.length).fill('_');


    await this.roomRepository.create(room.name, JSON.stringify(room));
    return room;
  }
}
