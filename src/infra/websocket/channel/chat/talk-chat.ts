import { Websocket } from "../../websocket";

export class TalkChat {
  constructor(
    private websocket: Websocket,
    private roomName: string,
  ) {
  }

  public listen(): void {
    const messageList:string[] = [];
    this.websocket.getIo()?.on("connect", (socket) => {
      socket.join(this.roomName);
      console.log("a user connected to chat");

      socket.on('talk-chat-message', (message: any) => {
        messageList.push(message);
        socket.to(this.roomName).emit(`talk-chat-message`, messageList);
        console.log(message);
      });
      
      socket.on("disconnect", () => {
        console.log("user disconnected");
        socket.leave(this.roomName);
      });
    });
  }
}
