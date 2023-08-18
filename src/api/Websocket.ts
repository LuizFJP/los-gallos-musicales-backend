import { Api } from "./Api";
import * as socketIo from 'socket.io';

export class Websocket {
    private static instance: Websocket;
    private api: Api = Api.get();
    private io: socketIo.Server;

    public static get() {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket();
        }

        return Websocket.instance;
    }

    private constructor() {}

    start() {
        this.io = new socketIo.Server(this.api.getServer(), { cors: { origin: "*" } });
    }

    getIo(): socketIo.Server {
        return this.io
    }
}