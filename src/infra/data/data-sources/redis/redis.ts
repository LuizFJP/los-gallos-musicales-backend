import { RedisClientType, createClient } from "redis";
import { CacheDatabase } from "../../interfaces/cache-database";
import { create } from "domain";

export class Redis implements CacheDatabase {
    private redisClient: RedisClientType;

    public constructor() { }

    public start(): CacheDatabase {
        this.redisClient = createClient({
            url: "redis://127.0.0.1:6379"
        })

        return this;
    }

    public async connect(): Promise<void> {
        await this.redisClient?.connect();
        console.log("redis client created");
    }

    public async close() {
        await this.redisClient?.disconnect();
    }

    public getClient(): RedisClientType {
        return this.redisClient;
    }

    public async save(key: string, value: any): Promise<void> {
        await this.redisClient.set(key, value);
        return Promise.resolve();
    }

    public async recover(key: string): Promise<any> {
        return await this.redisClient.get(key);
    }

    public async recoverAllKeys(): Promise<string[]> {
        return await this.redisClient.keys("*");
    }
}