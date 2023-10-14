export interface EncryptUsernameUseCase {
  execute(username: string): string;
}