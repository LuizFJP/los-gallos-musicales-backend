import { Genre } from "../../interfaces/entities/genre/genre";
import { GenreRepository } from "../../interfaces/repositories/genre-repository";
import { GetGenresUseCase } from "../../interfaces/use-cases/genre/get-genres-use-case";

export class GetGenres implements GetGenresUseCase {
  genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  execute(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }
}