import { PrismaLibSQL } from "@prisma/adapter-libsql";
// Default import (not named) because the generated client is CommonJS:
// under plain `node`, named ESM imports from it fail to resolve.
import prismaPkg from "@prisma/client";

const { PrismaClient } = prismaPkg;
type PrismaClient = InstanceType<typeof PrismaClient>;

/**
 * Create a PrismaClient backed by libSQL.
 *
 * - Production (Render): set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN to use the
 *   hosted Turso database (Render's free filesystem is ephemeral, so a local
 *   SQLite file would be wiped on every restart).
 * - Local dev: omit them to use a local SQLite file (DATABASE_URL or
 *   file:./dev.db fallback).
 */
export function createDbClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const adapter = tursoUrl
    ? new PrismaLibSQL({
        url: tursoUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      })
    : new PrismaLibSQL({
        url: process.env.DATABASE_URL ?? "file:./dev.db",
      });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createDbClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
