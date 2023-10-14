import { SecurityCipherInterface } from "../../interfaces/entities/security/security-cipher";
import { EncryptUsernameUseCase } from "../../interfaces/use-cases/security/encrypt-username-use-case";

export class EncryptUsername implements EncryptUsernameUseCase {
  private securityCipher: SecurityCipherInterface;

  constructor(securityCipher: SecurityCipherInterface) {
    this.securityCipher = securityCipher;
  }

  execute(username: string): string {
    console.log(username);
    return this.securityCipher.encrypt(username);
  }
}