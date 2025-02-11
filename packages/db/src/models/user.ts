import { Prisma } from "#prisma/client";

export const userExtension = Prisma.defineExtension({
  result: {
    user: {
      fullName: {
        // the dependencies
        needs: { firstName: true, lastName: true },
        compute(user) {
          // the computation logic
          return `${user.firstName} ${user.lastName}`;
        },
      },
    },
  },
});
