export interface GetRoomUseCase {
  execute(name: string): Promise<any>;
}