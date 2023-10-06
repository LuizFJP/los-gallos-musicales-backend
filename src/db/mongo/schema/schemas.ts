import { Schema, model } from 'mongoose';

// Image interface and schema
interface Image {
  paths: string[];
}

const imageSchema = new Schema<Image>({
  paths: { type: [String], required: true },
});

const ImageModel = model<Image>('Image', imageSchema);

// Genre interface and schema
interface Genre {
  id: string;
  name: string;
}

const genreSchema = new Schema<Genre>({
  name: { type: String, required: true },
});

const GenreModel = model<Genre>('Genre', genreSchema);

// Playlist interface and schema
interface Playlist {
  genre: Genre;
  playlistsUrl: string[];
}

const playlistSchema = new Schema<Playlist>({
  genre: { type: genreSchema, required: true },
  playlistsUrl: { type: [String], required: true },
});

const PlaylistModel = model<Playlist>('Playlist', playlistSchema);
