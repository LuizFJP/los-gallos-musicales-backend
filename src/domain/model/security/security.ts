import { Cipher, createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { SecurityCipherInterface } from "../../interfaces/entities/security/security-cipher";

export class SecurityCipher implements SecurityCipherInterface {
  private algorithm: string;
  private initialVector: Buffer;
  private securityKey: Buffer;

  constructor() {
    this.algorithm = "aes-256-cbc";
    this.initialVector = randomBytes(16);
    this.securityKey = randomBytes(32);
  }

  encrypt(data: string): string {
    const cipher = createCipheriv(this.algorithm, this.securityKey, this.initialVector);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  decrypt(data: string): string {
    const decipher = createDecipheriv(this.algorithm, this.securityKey, this.initialVector);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
