import * as v from "valibot";

export const getUserParamSchema = v.object({
  id: v.string(),
});
