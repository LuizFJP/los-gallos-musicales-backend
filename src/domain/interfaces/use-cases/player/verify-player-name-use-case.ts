export interface VerifyPlayerNameUseCase {
  execute(username: string, roomName: string): Promise<any>;
}