export interface DecryptUsernameUseCase {
  execute(username: string): string;
}