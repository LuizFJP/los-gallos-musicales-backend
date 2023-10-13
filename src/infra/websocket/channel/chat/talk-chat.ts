import { Websocket } from "../../websocket";

export class TalkChat {
  constructor(
    private websocket: Websocket,
    private roomName: string,
  ) {
  }

  public listen(): void {
    this.websocket.getIo()?.on("connect", (socket) => {
      console.log("quantas vezes entrou aqui");
      socket.join(this.roomName);
      console.log("a user connected to chat");

      socket.on('talk-chat-message', (message: any) => {
        socket.to(this.roomName).emit(`talk-chat-message`, message);
        console.log(message);
      });
      
      socket.on("disconnect", () => {
        console.log("user disconnected");
        socket.leave(this.roomName);
      });
    });
  }
}
