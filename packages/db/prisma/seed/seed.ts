import { seedUser } from "./user.ts";
import { db } from "../../src/index.ts";

export const seed = async () => {
  await seedUser();
};

await seed();

await db.$disconnect();
