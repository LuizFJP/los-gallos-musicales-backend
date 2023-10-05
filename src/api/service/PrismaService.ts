import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {

  constructor() {
    super();
    this.$connect();
  }

  endConnection() {
    this.$disconnect();
  }
}