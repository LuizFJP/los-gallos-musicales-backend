import { Websocket } from "../../websocket";

export class TalkChat {
  constructor(
    private websocket: Websocket,
    private roomName: string,
  ) {
    this.listen();
  }

  public listen(): void {
    this.websocket.getIo()?.on("connection", (socket) => {
      socket.join(this.roomName);
      console.log("a user connected");
      socket.on('talk-chat-message', (message: any) => {
        console.log(message);
        socket.join(this.roomName);
        socket.to(this.roomName).emit(`talk-chat-message`, message);
      });
      
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}
