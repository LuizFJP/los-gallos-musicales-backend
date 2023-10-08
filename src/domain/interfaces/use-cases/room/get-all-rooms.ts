export interface GetAllRoomsUseCase {
  execute(): Promise<string[]>;
}