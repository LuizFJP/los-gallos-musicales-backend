import { Genre } from "../../entities/genre/genre";

export interface GetGenresUseCase {
  execute(): Promise<Genre[]>;
}