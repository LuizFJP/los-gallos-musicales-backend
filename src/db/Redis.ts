import { RedisClientType, createClient } from "redis";

export class Redis {
    private static instance: Redis;
    private redisClient: RedisClientType;

    public static get(): Redis {
        if (!Redis.instance) {
            Redis.instance = new Redis();
        }

        return Redis.instance;
    }

    private constructor() { }

    public async start() {
        this.redisClient = createClient({
            url: "redis://127.0.0.1:6379"
        })
        await this.redisClient.connect();
        console.log("redis client created");
    }

    public async close() {
        await this.redisClient?.disconnect();
    }

    public getClient(): RedisClientType | null {
        return this.redisClient;
    }

}