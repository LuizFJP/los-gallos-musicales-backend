import { Schema, model } from 'mongoose';
import { Image } from '../../../api/domain/entities/Image';
import { Genre } from '../../../api/domain/entities/Genre';
import { Playlist } from '../../../api/domain/entities/Playlist';

const imageSchema = new Schema<Image>({
  id: { type: Number, required: true },
  path: { type: String, required: true },
});

export const ImageModel = model<Image>('Image', imageSchema);

const genreSchema = new Schema<Genre>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

export const GenreModel = model<Genre>('Genre', genreSchema);

const playlistSchema = new Schema<Playlist>({
  id: { type: Number, required: true },
  genre: { type: genreSchema, required: true },
  playlistsUrl: { type: [String], required: true },
});

export const PlaylistModel = model<Playlist>('Playlist', playlistSchema);
