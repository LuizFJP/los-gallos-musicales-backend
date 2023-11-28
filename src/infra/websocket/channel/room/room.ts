import { Websocket } from '../../websocket';
import { Room as RoomType } from '../../../../domain/interfaces/entities/room/room';
import { Player } from '../../../../domain/interfaces/entities/player/player';
import { Cronometer } from './cronometer';
import { SetArtist } from '../../../../domain/use-cases/room/set-artist';
import { RoomRepository } from '../../../../domain/interfaces/repositories/room-repository';
import { ChooseSongRoom } from '../../../../domain/use-cases/room/choose-song-room';
import { AddScoreToPlayer } from '../../../../domain/use-cases/room/add-score-to-player';
import { GiveTip } from '../../../../domain/use-cases/room/give-tip';
import { EnableTip } from '../../../../domain/use-cases/room/enable-tip';
import { DecrementNumberOfTips } from '../../../../domain/use-cases/room/decrement-number-of-tips';
import { ClearCanvas } from '../../../../domain/use-cases/room/clear-canvas';

export class Room {

  constructor(private websocket: Websocket, private roomRepository: RoomRepository) { }

  public listen(): void {
    console.log('channel de room criado')
    this.websocket.getIo()?.on('connect', (socket) => {
      const { name: roomName } = socket.handshake.query;

      console.log('a user connected', roomName, socket.id);

      socket.join(roomName as string);

      socket.on(`update-players`, async (roomName: string) => {
        const room = await this.roomRepository.get(roomName);
        const roomParsed = JSON.parse(room);
        socket.to(roomName).emit(`update-players`, roomParsed);
      });

      socket.on(`draw`, (roomName: string, data: any) => {
        socket.to(roomName).emit(`draw`, data);
      });

      socket.on('brushSizeChange', (roomName: string, size: number) => {
        socket.to(roomName).emit('brushSizeChange', size );
      });
      
      socket.on('eraserActivatedChange', (roomName: string, eraserActivated: boolean) => {
        socket.to(roomName).emit('eraserActivatedChange', eraserActivated );
      });

      socket.on('brushColorChange', (roomName: string, color: string) => {
        socket.to(roomName).emit('brushColorChange', color );
      });

      socket.on(`save`, async (roomName: string, canvas: string) => {
        const room = await this.roomRepository.get(roomName);
        const roomParsed = JSON.parse(room);
        roomParsed.canvas = canvas;
        const roomStringify = JSON.stringify(roomParsed);
        await this.roomRepository.create(roomName, roomStringify);
      });

      socket.on('leave-room', async (roomName: string, username: string) => {
        console.log('saiu da sala', roomName, username)
        const room = await this.roomRepository.get(roomName);
        const roomParsed = JSON.parse(room);
        const players = roomParsed.players.filter((player: Player) => player.username !== username);
        roomParsed.players = players;
        roomParsed.numberOfPlayers = roomParsed.numberOfPlayers - 1;
        const roomStringify = JSON.stringify(roomParsed);
        await this.roomRepository.create(roomName, roomStringify);
        socket.to(roomName).emit(`update-players`, roomParsed);
        socket.leave(roomName);
      });

      socket.on('cronometer', async (room: RoomType) => {
        const cronometer = new Cronometer(
          this.websocket.getIo(),
          room,
          new SetArtist(this.roomRepository),
          new ChooseSongRoom(this.roomRepository));

        cronometer.start();
      });

      socket.on('update-score', async (roomName: string, userName: string, score: number) => {
        const addScoreToPayer = new AddScoreToPlayer(this.roomRepository);
        const room = await addScoreToPayer.execute(roomName, userName, score);
        this.websocket.getIo().in(roomName).emit(`update-players`, room);
      });

      socket.on('tip', async (roomName: string, tip: string[], tipOn: boolean) => {
        const roomNumberOfTipsUpdated = await new DecrementNumberOfTips(this.roomRepository).execute(roomName);
        await new GiveTip(this.roomRepository).execute(roomNumberOfTipsUpdated, tip, tipOn);
        this.websocket.getIo().in(roomName).emit(`tip`, tip, roomNumberOfTipsUpdated?.tip?.numberOfTips, tipOn);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected')
      });
    });
  }
}

