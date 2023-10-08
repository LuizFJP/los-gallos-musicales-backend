import { genreModel } from "../../infra/data/interfaces/data-sources/mongodb/schemas";
import { GenreRepository } from "../interfaces/repositories/genre-repository";

export class GenreRepositoryImpl implements GenreRepository {

  public constructor(){}

  public async findAll() {
        const genres = await genreModel.find();
        return genres;
    }
}