import { db } from "../data/index";
import { InsertableSession } from "../types/session";

export const getSessionBySessionID = async (sessionID: string) => {
  const session = await db
    .selectFrom("session")
    .selectAll()
    .where("sessionID", "=", sessionID)
    .executeTakeFirst();

  return session;
};

export const createSession = async (session: InsertableSession) => {
  const newSession = await db
    .insertInto("session")
    .values(session)
    .returning("session.sessionID")
    .executeTakeFirstOrThrow();

  return getSessionBySessionID(newSession.sessionID);
};

export const deleteSessionBySessionID = async (sessionID: string) => {
  await db.deleteFrom("session").where("sessionID", "=", sessionID).execute();
};
