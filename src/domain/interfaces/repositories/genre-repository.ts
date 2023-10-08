import { Genre } from "../entities/genre/genre";

export interface GenreRepository {
  findAll(): Promise<Genre[]>;
}