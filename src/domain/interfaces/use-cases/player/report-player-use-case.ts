export interface ReportPlayerUseCase {
    execute(roomName: string, username: string): Promise<any>;
}