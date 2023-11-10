import { Api } from "./api";
import { Room } from "./channel/room/room";
import { Room as RoomType } from '../../domain/interfaces/entities/room/room';

import { CacheDatabase } from "../data/interfaces/cache-database";
import { Server } from "socket.io";
import { TalkChat } from "./channel/chat/talk-chat";
import { AnswerChat } from "./channel/chat/answer-chat";
import { RoomRepository } from "../../domain/interfaces/repositories/room-repository";

export class Websocket {
    private io: Server;

    constructor(private api: Api, private cacheDatabase: CacheDatabase, private roomRepository: RoomRepository) { }

    start() {
        this.io = new Server(this.api.server, { cors: { origin: "*" } });
        this.createRoomChannel();
        this.createChatChannel();
        this.createAnwerChannel();
    }

    getIo(): Server {
        return this.io
    }

    createRoomChannel() {
        const room = new Room(this, this.cacheDatabase, this.roomRepository);
        room.listen();
     }

    createChatChannel() { 
        const talkChat = new TalkChat(this);
        talkChat.listen();
    }
    createAnwerChannel() {
        const answerChat = new AnswerChat(this);
        answerChat.listen();
    }
}
