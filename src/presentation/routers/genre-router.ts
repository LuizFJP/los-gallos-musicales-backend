import { Router } from "express";
import { GetGenresUseCase } from "../../domain/interfaces/use-cases/genre/get-genres-use-case";

export function GenreRoute(
    getGenresUseCase: GetGenresUseCase,
) {

    const router = Router();

    router.get('/all', async (req, res) => {
        const genres = await getGenresUseCase.execute();
        res.json(genres);
    })

    return router;
}