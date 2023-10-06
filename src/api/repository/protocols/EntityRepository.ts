export interface EntityRepository {
  create(createClassDto: any): Promise<any>;
  findById(id: string): Promise<any>;
  findByName(name: string): Promise<any>;
  findAll(): Promise<any[]>;
  delete(id: string): Promise<any>;
  update(id: string, updateClassDto: any): Promise<any>;
}