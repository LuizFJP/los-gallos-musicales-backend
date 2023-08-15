import express from "express";
import cors from "cors";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import * as redis from "redis";

class App {
  public app: express.Application | null = null;
  public server: Server | null = null;
  private io: socketIo.Server | null = null;
  public PORT: number = 8100;
  public redisClient: redis.RedisClientType | null = null;

  constructor() {
    this.setupCachedDB();
    this.start();
    this.routes();
    this.listen();
  }

  async setupCachedDB() {
    this.redisClient = redis.createClient({
      url: "redis://127.0.0.1:6379"
    })
    await this.redisClient.connect();
    console.log("redis client created");
  }

  start() {
    console.log("server started")
    this.app = express();
    this.app.use(cors());
    this.server = createServer(this.app);
    this.io = new socketIo.Server(this.server, { cors: { origin: "*" } })
    this.server.listen(this.PORT);
  }

  routes() {
    this.app?.route("/").get(async (_req, res) => {
      const data = await this.redisClient?.get("room");
      res.json({ img: data })
    });
  };

  private listen(): void {

    this.io?.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('draw', function (data: any) {
        socket.broadcast.emit('draw', data)
      });

      socket.on('save', async (data: any) => {
        console.log("called");
        await this.redisClient?.SET('room', data);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}

export default new App();