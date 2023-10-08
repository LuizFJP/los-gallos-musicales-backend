export interface IncrementPlayerCountUseCase {
  execute(roomName: string): Promise<void>;
}