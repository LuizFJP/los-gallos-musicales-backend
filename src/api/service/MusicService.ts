import YTMusic from "ytmusic-api";

export class MusicService {
  
  public async getSong(name: string) {
    console.log("testeee")
    const ytmusic = await new YTMusic().initialize();
    const result = await ytmusic?.getSong(name);

    return result;
  }
}