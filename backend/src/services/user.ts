import { db } from "../data/index";

export const getUserByUsername = async (username: string) => {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirst();

  return user;
};
