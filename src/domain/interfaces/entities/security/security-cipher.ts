
export interface SecurityCipherInterface {
  encrypt(data: string): string;
  decrypt(data: string): string;
}