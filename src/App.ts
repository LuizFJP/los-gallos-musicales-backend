import { Api } from "./api/Api";
import { Redis } from "./db/Redis"
import { Websocket } from "./api/Websocket";
import { Mongo } from "./db/Mongo";

class App {
  private api: Api = Api.getInstance();
  private websocket: Websocket = Websocket.getInstance();
  private redis: Redis = Redis.getInstance();
  private mongo: Mongo;

  constructor() {
    this.mongo = new Mongo();
    this.redis.start();
    this.api.start();
    this.websocket.start();
  }
}

export default new App();