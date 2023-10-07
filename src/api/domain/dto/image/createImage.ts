export type CreateImageDto = { 
  mimetype: string;
  buffer: Buffer;
  originalname: string;
  size: number;
}