import { Api } from "./api";
import * as socketIo from 'socket.io';
import { Room } from "./channel/room";
import { CacheDatabase } from "../data/interfaces/cache-database";

export class Websocket {
    private io: socketIo.Server;

    constructor(private api: Api, private cacheDatabase: CacheDatabase) {}

    start() {
        this.io = new socketIo.Server(this.api.server, { cors: { origin: "*" } });
    }

    getIo(): socketIo.Server {
        return this.io
    }

    createRoomChannel(room: string) {
        new Room(this, {name: room, canvas: ""}, this.cacheDatabase);
    }
}