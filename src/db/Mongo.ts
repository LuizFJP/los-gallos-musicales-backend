import mongoose from "mongoose";

export class Mongo {

  async connect() {
    try {
      return await mongoose.connect("mongodb://localhost:27017/lgm");
    } catch (error) {
      console.log(error);
    }
  }
}
