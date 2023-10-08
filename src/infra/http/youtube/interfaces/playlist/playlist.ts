interface ResourceId {
  kind: string;
  videoId: string;
}

interface ThumbnailData {
  url: string;
  width: number;
  height: number;
}

interface Thumbails {
  default: ThumbnailData;
  medium: ThumbnailData;
  high: ThumbnailData;
  standard: ThumbnailData;
  maxres: ThumbnailData;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface Playlist {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}