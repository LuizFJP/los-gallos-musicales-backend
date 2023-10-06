export type ListPlaylistDto = {
  title: string;
  playlistURLs: {name: string, url: string}[];
}