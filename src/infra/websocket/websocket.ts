import { Api } from "./api";
import { Room } from "./channel/room";
import { Room as RoomType } from '../../domain/interfaces/entities/room/room';

import { CacheDatabase } from "../data/interfaces/cache-database";
import { Server } from "socket.io";

export class Websocket {
    private io: Server;

    constructor(private cacheDatabase: CacheDatabase) {}

    start() {
        this.io = new Server(3000, { cors: { origin: "*" } });
        this.createRoomChannel();
    }

    getIo(): Server {
        return this.io
    }

    createRoomChannel() {
        const roomChannel = new Room(this, this.cacheDatabase);
        roomChannel.listen();
    }
}