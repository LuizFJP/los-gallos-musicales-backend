import { Application } from "express";
import { createServer, Server } from 'http';
import express from "express";
import cors from "cors";
import { GenreRoute } from "../../presentation/routers/genre-router";
import { GetGenres } from "../../domain/use-cases/genre/get-genres";
import { GenreRepositoryImpl } from "../../domain/repositories/genre.repository";
import { ImageRoute } from "../../presentation/routers/image-router";
import { DownloadAllImages } from "../../domain/use-cases/image/download-all-images";
import { ImageRepositoryImpl } from "../../domain/repositories/image-repository";
import { UploadImage } from "../../domain/use-cases/image/upload-image";
import { PlaylistRoute } from "../../presentation/routers/playlist-router";
import { GetPlaylists } from "../../domain/use-cases/playlist/get-playlists";
import { PlaylistRepositoryImpl } from "../../domain/repositories/playlist-repository";
import { RoomRouter } from "../../presentation/routers/room-router.";
import { CreateRoom } from "../../domain/use-cases/room/create-room";
import { EnterRoom } from "../../domain/use-cases/room/enter-room";
import { GetAllRoom } from "../../domain/use-cases/room/get-all-room";
import { RoomRepositoryImpl } from "../../domain/repositories/room-repository";
import { Redis } from "../data/data-sources/redis/redis";
import { CacheDatabase } from "../data/interfaces/cache-database";

export class Api {
    public app: Application;
    public server: Server;
    public PORT = 8100;

    public constructor(private cacheDatase: CacheDatabase) { }

    start() {
        console.log("server started")
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/genre', GenreRoute(new GetGenres(new GenreRepositoryImpl())));
        this.app.use("/image", ImageRoute(new DownloadAllImages(new ImageRepositoryImpl()), new UploadImage(new ImageRepositoryImpl())));
        this.app.use("/playlist", PlaylistRoute(new GetPlaylists(new PlaylistRepositoryImpl())));
        this.app.use("/room", RoomRouter(
        new CreateRoom(new RoomRepositoryImpl(this.cacheDatase)), 
        new EnterRoom(new RoomRepositoryImpl(this.cacheDatase)),
        new GetAllRoom(new RoomRepositoryImpl(this.cacheDatase))));
        this.server = createServer(this.app);
        this.server.listen(this.PORT);
    }
}
