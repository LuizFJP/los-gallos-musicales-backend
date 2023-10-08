export interface NoSQLDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insert(collection: string, data: any): Promise<any>;
  find(collection: string, query: any): Promise<any>;
  findOne(collection: string, query: any): Promise<any>;
  update(collection: string, query: any, data: any): Promise<any>;
  delete(collection: string, query: any): Promise<any>;
}