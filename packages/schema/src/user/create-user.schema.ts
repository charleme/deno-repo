import * as v from "valibot";
import { updateUserBodySchema } from "./update-user.schema.ts";

export const createUserBodySchema = v.intersect([
  updateUserBodySchema,
  v.object({ email: v.pipe(v.string(), v.email()) }),
]);
