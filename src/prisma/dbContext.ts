import { DatabaseError } from "#errors/databaseError.js";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/prisma/client.js";

export class DbContext {
  private static readonly _connectionString?: string = process.env["DATABASE_URL"];

  public readonly client: PrismaClient;

  constructor() {
    this.client = this.createClient();
  }

  public async connect() {
    await this.client.$connect();
  }

  public async disconnect() {
    await this.client.$disconnect();
  }

  private createClient(): PrismaClient {
    if (!DbContext._connectionString) {
      throw new DatabaseError("Database connection string is not defined");
    }

    const adapter = new PrismaPg({
      connectionString: DbContext._connectionString,
    });

    return new PrismaClient({ adapter });
  }
}
