import { Api } from "./api";
import { Room } from "./channel/room";
import { Room as RoomType } from '../../domain/interfaces/entities/room/room';

import { CacheDatabase } from "../data/interfaces/cache-database";
import { Server } from "socket.io";
import { TalkChat } from "./channel/chat/talk-chat";

export class Websocket {
    private io: Server;

    constructor(private cacheDatabase: CacheDatabase) { }

    start() {
        this.io = new Server(3000, { cors: { origin: "*" } });
        this.createRoomChannel();
        this.createChatChannel();
    }

    getIo(): Server {
        return this.io
    }

    createRoomChannel() {
        new Room(this, this.cacheDatabase);
    }

    createChatChannel() { 
        console.log('joined chat');
        const talkChat = new TalkChat(this);
        talkChat.listen();
    }
}