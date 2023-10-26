import { Api } from "./api";
import { Room } from "./channel/room/room";
import { Room as RoomType } from '../../domain/interfaces/entities/room/room';

import { CacheDatabase } from "../data/interfaces/cache-database";
import { Server } from "socket.io";
import { TalkChat } from "./channel/chat/talk-chat";

export class Websocket {
    private io: Server;

    constructor(private api: Api, private cacheDatabase: CacheDatabase) { }

    start() {
        this.io = new Server(this.api.server, { cors: { origin: "*" } });
        this.createChatChannel();
        this.createRoomChannel();
    }

    getIo(): Server {
        return this.io
    }

    createRoomChannel() {
        const room = new Room(this, this.cacheDatabase);
        room.listen();
     }

    createChatChannel() { 
        const talkChat = new TalkChat(this);
        talkChat.listen();
    }
}