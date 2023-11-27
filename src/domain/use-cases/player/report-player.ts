import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { ReportPlayerUseCase } from "../../interfaces/use-cases/player/report-player-use-case";
import { Room } from '../../interfaces/entities/room/room';

export class ReportPlayer implements ReportPlayerUseCase {
    private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository
      }
  
    async execute(roomName: string, username: string): Promise<any>{
        try {
            const room = await this.roomRepository.get(roomName);
            if(room) {
                const roomParsed = JSON.parse(room) as Room;
                const player = roomParsed?.players?.find((player) => player.username === username );
                
                if(player?.penalties as number <  ( roomParsed.players!.length * 0.7)){
                    if(player?.penalties !== undefined ) {
                        player.penalties += 1;
                    }
                } else {
                   const players = roomParsed?.players?.filter((player) => player.username !== username );
                    
                }
                
            }
        }
        catch (erro){
            return null;
        }   
    }
}
