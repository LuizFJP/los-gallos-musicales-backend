import { SongDTO } from "../../dto/playlist/song";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { ChooseSongRoomUseCase } from "../../interfaces/use-cases/room/choose-song-room-use-case";

export class ChooseSongRoom implements ChooseSongRoomUseCase {
  constructor (private roomRepository: RoomRepository) {}

  public async execute(roomName: string): Promise<SongDTO> {
    const room = await this.roomRepository.get(roomName);
    const roomParsed = JSON.parse(room);
   
    let song: SongDTO;
    let index: number; 
    if (roomParsed.listSongs.length <= 1 ) {
      index = 0;
      song = roomParsed.listSongs[index];
    } else {
      index = Math.floor(Math.random() * roomParsed.listSongs.length - 1);
      song = roomParsed.listSongs[index];
    }

    roomParsed.listSongs = roomParsed.listSongs.filter(
      (_song: SongDTO, indexSong: number) => indexSong !== index);
    roomParsed.song = song;

    await this.roomRepository.create(roomName, JSON.stringify(roomParsed));
    return song;
  }
}
