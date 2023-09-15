import { Api } from "./api/Api";
import { Redis } from "./db/Redis"
import { Websocket } from "./api/Websocket";

class App {
  private api: Api = Api.getInstance();
  private websocket: Websocket = Websocket.getInstance();
  private redis: Redis = Redis.getInstance();

  constructor() {
    this.redis.start();
    this.api.start();
    this.websocket.start();
  }
}

export default new App();