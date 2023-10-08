export interface CacheDatabase {
  start(): CacheDatabase;
  connect(): Promise<void>;
  close(): Promise<void>;
  save(key: string, value: any): Promise<void>;
  recover(key: string): Promise<any>;
  recoverAllKeys(): Promise<string[]>;
}