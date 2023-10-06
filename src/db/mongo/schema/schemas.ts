import { Mongoose, Schema, model } from "mongoose";
import { Image } from "../../../api/domain/entities/Image";
import { Genre } from "../../../api/domain/entities/Genre";
import { Playlist } from "../../../api/domain/entities/Playlist";
export class MongooseSchema {
  private imageModel: any;
  private genreModel: any;
  private playlistModel: any;
  private imageSchema: any;
  private genreSchema: any;
  private playlistSchema: any;
  public constructor() {}

  public async initSchema() {
    await this.getImageModel();
    await this.getGenreModel();
    await this.getPlaylistModel();
  }

  public getImageModel() {
    if (!this.imageModel) {
      this.imageSchema = new Schema<Image>({
        buffer: { type: Buffer, required: true },
        mimetype: { type: String, required: true },
        originalname: { type: String, required: true },
        size: { type: Number, required: true },
      });

      this.imageModel = model<Image>("Image", this.imageSchema);
    }
    return this.imageModel;
  }

  public getGenreModel() {
    if (!this.genreModel) {
      this.genreSchema = new Schema<Genre>({
        id: { type: Number, required: true },
        name: { type: String, required: true },
      });

      this.genreModel = model<Genre>("Genre", this.genreSchema);
    }
    return this.genreModel;
  }

  public getPlaylistModel() {
    if (!this.playlistModel) {
      this.playlistSchema = new Schema<Playlist>({
        id: { type: Number, required: true },
        genre: { type: this.genreSchema, required: true },
        playlistsUrl: { type: [String], required: true },
      });

      this.playlistModel = model<Playlist>("Playlist", this.playlistSchema);
    }
    return this.playlistModel;
  }
}
