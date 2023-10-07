import { Schema, model } from "mongoose";
import { Image } from "../../../api/domain/entities/Image";
import { Genre } from "../../../api/domain/entities/Genre";
import { Playlist } from "../../../api/domain/entities/Playlist";

const imageSchema = new Schema<Image>({
    buffer: { type: Buffer, required: true },
    mimetype: { type: String, required: true },
    originalname: { type: String, required: true },
    size: { type: Number, required: true },
  });

  export const imageModel = model<Image>("Image", imageSchema);

  const genreSchema = new Schema<Genre>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
  });

  export const genreModel = model<Genre>("Genres", genreSchema);

  const playlistSchema = new Schema<Playlist>({
    id: { type: Number, required: true },
    genre: { type: genreSchema, required: true },
    playlistsUrl: { type: [String], required: true },
  });

  export const playlistModel = model<Playlist>("Playlist", playlistSchema);


