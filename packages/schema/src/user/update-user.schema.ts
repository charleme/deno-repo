import * as v from "valibot";

export const updateUserBodySchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3)),
  lastName: v.pipe(v.string(), v.minLength(3)),
  password: v.pipe(v.string(), v.minLength(8)),
});

export const updateUserParamSchema = v.object({
  id: v.string(),
});
