import * as v from "valibot";

export function getEnv<
  TEntries extends v.ObjectEntries,
  TMessage extends v.ErrorMessage<v.ObjectIssue> | undefined,
>(
  schema: v.ObjectSchema<TEntries, TMessage>,
): v.InferOutput<v.ObjectSchema<TEntries, TMessage>> {
  return v.parse(schema, Deno.env.toObject());
}
