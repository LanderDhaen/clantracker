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
  const newSession = await db.insertInto("session").values(session).execute();

  return getSessionBySessionID(session.sessionID);
};
