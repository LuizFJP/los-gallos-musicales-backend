import { Api } from "./api";
import * as socketIo from 'socket.io';
import { Room } from "./channel/room";
import { Room as RoomType } from '../../domain/interfaces/entities/room/room';

import { CacheDatabase } from "../data/interfaces/cache-database";
import { TalkChat } from "./channel/chat/talk-chat";

export class Websocket {
    private io: socketIo.Server;

    constructor(private api: Api, private cacheDatabase: CacheDatabase) {}

    start() {
        this.io = new socketIo.Server(this.api.server, { cors: { origin: "*" } });
    }

    getIo(): socketIo.Server {
        return this.io
    }

    createRoomChannel(roomName: string) {
        new Room(this, roomName, this.cacheDatabase);
    }

    createChatChannel(roomName: string) {
        console.log('joined chat');
        const talkChat = new TalkChat(this, roomName);
        talkChat.listen();
    }
}