import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseURL = process.env["DATABASE_URL"];

if (!databaseURL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const prismaPath = "src/prisma";

export default defineConfig({
  datasource: { url: databaseURL },
  migrations: { path: `${prismaPath}/migrations` },
  schema: `${prismaPath}/schema.prisma`,
});
