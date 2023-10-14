import { SecurityCipherInterface } from "../../interfaces/entities/security/security-cipher";
import { DecryptUsernameUseCase } from "../../interfaces/use-cases/security/decrypt-username-use-case";

export class DecryptUsername implements DecryptUsernameUseCase {
  private securityCipher: SecurityCipherInterface;

  constructor(securityCipher: SecurityCipherInterface) {
    this.securityCipher = securityCipher;
  }

  execute(username: string): string {
    console.log(username);
    return this.securityCipher.decrypt(username);
  }
}