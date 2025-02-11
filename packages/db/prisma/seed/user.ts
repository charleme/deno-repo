import { db } from "../../src/index.ts";
import { faker } from "@faker-js/faker";

export const seedUser = async () => {
  // Supprimer les anciennes données pour éviter les doublons
  await db.user.deleteMany();

  // 🌟 Générer 10 utilisateurs aléatoires
  await Promise.all(
    Array.from({ length: 10 }).map(() => {
      return db.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
    }),
  );
};
