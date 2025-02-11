import { getEnv } from "@package/env";
import { allModelExtension } from "./models/all.ts";
import { userExtension } from "./models/user.ts";
import { PrismaClient } from "#prisma/client";
import { dbEnvSchema } from "@package/schema";

const env = getEnv(
  dbEnvSchema,
);

const createPrismaClient = () =>
  new PrismaClient({
    log: env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  }).$extends(
    allModelExtension,
  ).$extends(userExtension);

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

export type DbClient = ReturnType<typeof createPrismaClient>;
export type PrismaDB = Omit<
  DbClient,
  "$transaction" | "$connect" | "$disconnect" | "$extends"
>;

export type DBExtArgs = DbClient["$extends"]["extArgs"];

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
