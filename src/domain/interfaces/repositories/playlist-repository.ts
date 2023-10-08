export interface PlaylistRepository {
  findByName(name: string): Promise<any>;
}