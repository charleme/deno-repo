import { Hono } from "hono";

import { db } from "@package/db";
import { sValidator } from "@hono/standard-validator";
import {
  createUserBodySchema,
  deleteUserParamSchema,
  getUserParamSchema,
  updateUserBodySchema,
  updateUserParamSchema,
} from "@package/schema";

const app = new Hono();

app.get("/users", async (c) => {
  const users = await db.user.findMany();
  return c.json(users);
});

app.post("/users", sValidator("json", createUserBodySchema), async (c) => {
  const body = c.req.valid("json");
  const user = await db.user.create({ data: body });
  return c.json(user, 201);
});

app.get("/users/:id", sValidator("param", getUserParamSchema), async (c) => {
  const user = await db.user.findUnique({
    where: { id: c.req.valid("param").id },
  });
  return user ? c.json(user) : c.json({ error: "User not found" }, 404);
});

app.put(
  "/users/:id",
  sValidator("param", updateUserParamSchema),
  sValidator("json", updateUserBodySchema),
  async (c) => {
    const body = c.req.valid("json");
    const updatedUser = await db.user.update({
      where: { id: c.req.valid("param").id },
      data: body,
    });
    return c.json(updatedUser);
  },
);

app.delete(
  "/users/:id",
  sValidator("param", deleteUserParamSchema),
  async (c) => {
    await db.user.delete({ where: { id: c.req.valid("param").id } });
    return c.json({ message: "User deleted" });
  },
);

Deno.serve(app.fetch);
