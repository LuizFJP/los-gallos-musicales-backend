import { RedisClientType, createClient } from "redis";
import { CacheDatabase } from "../../interfaces/cache-database";
import { create } from "domain";
import roomsDump from '../../../../../rooms-dump.json';

export class Redis implements CacheDatabase {
    private redisClient: RedisClientType;

    public constructor() { }

    public start(): CacheDatabase {
        this.redisClient = createClient({
            url: "redis://127.0.0.1:6379"
        });   
        return this;
    }

    public async connect(): Promise<void> {
        await this.redisClient?.connect();
        await this.dump();
    }

    public async close() {
        await this.redisClient?.disconnect();
    }

    public getClient(): RedisClientType {
        return this.redisClient;
    }

    public async save(key: string, value: any): Promise<any> {
        await this.redisClient.set(key, value);
    }

    public async recover(key: string): Promise<any> {
        return await this.redisClient.get(key);
    }

    public async recoverAllKeys(): Promise<string[]> {
        return await this.redisClient.keys("*");
    }

    public async recoverMultipleValues(keys: string[]): Promise<any> {
        return await this.redisClient.mGet(keys);
    }

    private async dump(): Promise<any> {
        const roomsName = Object.keys(roomsDump);
        
        roomsName.forEach(async (roomName) => {
            await this.redisClient.set(roomName, roomsDump[roomName].value);
        })
    }
}
