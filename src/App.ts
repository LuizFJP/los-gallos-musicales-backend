import { Api } from "./infra/websocket/api";
import { Redis } from "./infra/data/data-sources/redis/Redis"
import { Websocket } from "./infra/websocket/websocket";
import { Mongo } from "./infra/data/data-sources/mongodb/Mongo";

class App {
  private api: Api;
  private websocket: Websocket;
  private redis: Redis = new Redis();
  private mongo: Mongo;

  constructor() {
    this.redis.start();
    this.redis.connect();
    this.mongo = new Mongo();
    this.mongo.connect()
    this.api = new Api(this.redis);
    this.api.start();
    this.websocket = new Websocket(this.api, this.redis);
    this.websocket.start();
  }
}

export default new App();