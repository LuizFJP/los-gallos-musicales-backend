export interface EnableTipUseCase {
  execute(roomName: string, tipOn: boolean): Promise<void>;
}