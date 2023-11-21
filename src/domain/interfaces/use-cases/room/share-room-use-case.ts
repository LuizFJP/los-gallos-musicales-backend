export interface ShareRoomUseCase {
  execute(roomName: string): Promise<string>;
}