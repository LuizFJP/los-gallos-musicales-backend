import 'dotenv/config';
import mongoose from "mongoose";

export class Mongo {

  async connect() {
    try {
      return await mongoose.connect(process.env.MONGO_URL as string, {
        dbName: process.env.MONGO_DB_NAME,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
