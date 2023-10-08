import { Schema, model } from "mongoose";
import { Image } from "../../../../../domain/interfaces/entities/image/image";
import { Genre } from "../../../../../domain/interfaces/entities/genre/genre";
import { Playlist } from "../../../../../domain/interfaces/entities/playlist/playlist";

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