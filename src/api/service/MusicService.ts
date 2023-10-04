export class MusicService {

  private apiKey: string = "AIzaSyBNjLHRnx_ebEUQECXgJrKcjvGZ3MGao2I";
  
  public async getSong(name: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${name}&key=${this.apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    const videoId = json.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return videoUrl;
  }
}