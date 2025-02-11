import * as v from "valibot";

export const deleteUserParamSchema = v.object({
  id: v.string(),
});
