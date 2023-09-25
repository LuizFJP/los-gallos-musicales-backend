import { Application } from "express";
import { createServer, Server } from 'http';
import express from "express";
 import cors from "cors";
import { Routes } from "./routes/Routes";

export class Api {
    public static instance: Api;
    public app: Application;
    public server: Server;
    public PORT = 8100;

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }

        return Api.instance;
    }

    private constructor() { }

    start() {
        console.log("server started")
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/', Routes.getInstance().getRouter());
        this.server = createServer(this.app);
        this.server.listen(this.PORT);
    }

    getServer(): Server {
        return this.server;
    }

    getApp(): Application | null{
        return this.app;
    }

}