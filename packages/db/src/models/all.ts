import { Prisma } from "#prisma/client";

export const allModelExtension = Prisma.defineExtension({
  model: {
    $allModels: {
      async exists<T>(
        this: T,
        where: Prisma.Args<T, "findFirst">["where"],
      ): Promise<boolean> {
        // Get the current model at runtime
        const context = Prisma.getExtensionContext(this);

        // deno-lint-ignore no-explicit-any
        return !!(await (context as any).findFirst({ where }));
      },
      /**
       * Get the paginated results of a query and the total count of the results
       */
      async paginate<
        T,
        Select extends Prisma.Args<T, "findMany">["select"] | undefined,
      >(
        this: T,
        findManyArgs: {
          select?: Select;
          where: Prisma.Args<T, "findMany">["where"];
        },
        paginationProps: {
          per_page: number;
          page: number;
          orderBy: Prisma.Args<T, "findMany">["orderBy"];
        },
      ): Promise<[Prisma.Result<T, { select: Select }, "findMany">, number]> {
        // Get the current model at runtime
        // deno-lint-ignore no-explicit-any
        const context: any = Prisma.getExtensionContext(this);

        const { per_page, page, orderBy } = paginationProps;

        // Prisma Client query that retrieves data based
        return await Promise.all([
          context.findMany({
            select: findManyArgs.select,
            where: findManyArgs.where,
            skip: page * per_page,
            take: per_page,
            orderBy: orderBy,
          }),

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          context.count({ where: findManyArgs.where }),
        ]);
      },
    },
  },
});
