import { Application } from "express";
import { createServer, Server } from "http";
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
import { CacheDatabase } from "../data/interfaces/cache-database";
import { Websocket } from "./websocket";
import { SecurityRoute } from "../../presentation/routers/security-router";
import { EncryptUsername } from "../../domain/use-cases/security/encrypt-username-use-case";
import { DecryptUsername } from "../../domain/use-cases/security/decrypt-username-use-case";
import { SecurityCipher } from "../../domain/model/security/security";
import { GetRoom } from "../../domain/use-cases/room/get-room";
import { RoomRepository } from "../../domain/interfaces/repositories/room-repository";
import { VerifyPlayerName } from "../../domain/use-cases/player/verify-player-name-use-case";
import { CheckRoomIsFull } from "../../domain/use-cases/room/check-room-is-full";
import { GetAllRoomData } from "../../domain/use-cases/room/get-all-room-data";

export class Api {
    public app: Application;
    public server: Server;
    public PORT = 8100;
    private websocket: Websocket;
    private roomRepository: RoomRepository = new RoomRepositoryImpl(this.cacheDatase);

    public constructor(private cacheDatase: CacheDatabase) { }

    start() {
        console.log("server started");
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.server = createServer(this.app);

        this.startWebsocket();

        this.app.use(
            "/genre",
            GenreRoute(new GetGenres(new GenreRepositoryImpl()))
        );
        this.app.use(
            "/image",
            ImageRoute(
                new DownloadAllImages(new ImageRepositoryImpl()),
                new UploadImage(new ImageRepositoryImpl())
            )
        );
        this.app.use(
            "/playlist",
            PlaylistRoute(new GetPlaylists(new PlaylistRepositoryImpl()))
        );

        this.app.use(
            "/room",
            RoomRouter(
                new CreateRoom(this.roomRepository),
                new EnterRoom(this.roomRepository),
                new GetAllRoom(this.roomRepository),
                new GetRoom(this.roomRepository),
                new CheckRoomIsFull(this.roomRepository),
                new GetAllRoomData(this.roomRepository)
            )
        );
        const securityCipher = new SecurityCipher();
        this.app.use(
            "/security",
            SecurityRoute(
                new EncryptUsername(securityCipher),
                new DecryptUsername(securityCipher),
                new VerifyPlayerName(this.roomRepository)
            )
        );

        this.server.listen(this.PORT);
    }

    startWebsocket() {
        this.websocket = new Websocket(this, this.roomRepository);
        this.websocket.start();
    }

}
