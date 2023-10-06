import { EntityRepository } from "./protocols/EntityRepository";

export class ImageRepository implements EntityRepository {

  constructor() {
  }
  async create(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
