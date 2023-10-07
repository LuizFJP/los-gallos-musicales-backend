import 'dotenv/config';

import { GenreRepository } from '../repository/GenreRepository';

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }
  
  public async getGenres() {
    return this.genreRepository.findAll();
  }
}

