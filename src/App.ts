import { Api } from "./api/Api";
import { Redis } from "./db/Redis"
import { Websocket } from "./api/Websocket";

class App {
  private api: Api = Api.get();
  private websocket: Websocket = Websocket.get();
  private redis: Redis = Redis.get();

  constructor() {
    this.api.start();
    this.websocket.start();
    this.redis.start();
  }
}

export default new App();