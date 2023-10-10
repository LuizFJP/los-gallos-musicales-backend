import { Api } from "./api";
import * as socketIo from 'socket.io';

export class Websocket {
    private io: socketIo.Server;

    constructor(private api: Api) {}

    start() {
        this.io = new socketIo.Server(this.api.server, { cors: { origin: "*" } });
    }

    getIo(): socketIo.Server {
        return this.io
    }
}