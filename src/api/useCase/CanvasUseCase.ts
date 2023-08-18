import { Redis } from "../../db/Redis";

export class CanvasUseCase {
    private static redisClient = Redis.get().getClient();

    public static async getCanvas() {
        return await CanvasUseCase.redisClient?.get("room");
    }
}