import { Websocket } from "../../websocket";

export class TalkChat {
  constructor(
    private websocket: Websocket,
  ) {
  }

  public listen(): void {
    this.websocket.getIo()?.on("connect", (socket) => {
      const { name: roomName } = socket.handshake.query;
      socket.join(roomName as string);

      console.log("a user connected to chat");

      socket.on('talk-chat-message', (roomName: string, message: any) => {
        socket.to(roomName).emit(`talk-chat-message`, message);
        console.log(message);
      });
      
      socket.on("disconnect", () => {
        console.log('user disconnected from chat')
      });
    });
  }
}
