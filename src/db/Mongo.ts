import {Mongoose} from "mongoose";

export class Mongo {
    public constructor() {
      new Mongoose().connect("mongodb://localhost:27017/lgm");
    }
}
