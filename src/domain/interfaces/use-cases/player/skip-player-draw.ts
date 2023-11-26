export interface SkipPlayerDrawUseCase {
  execute(roomName: string): Promise<void>;
}