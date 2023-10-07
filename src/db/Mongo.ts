import 'dotenv/config';
import mongoose from "mongoose";

export class Mongo {

  async connect() {
    try {
      return await mongoose.connect(process.env.MONGO_URL as string);
    } catch (error) {
      console.log(error);
    }
  }
}
