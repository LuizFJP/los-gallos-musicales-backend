export interface CheckRoomIsFullUseCase {
  execute(roomName: string): Promise<boolean>
}