import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom("session").execute();

  await db
    .insertInto("session")
    .values([
      {
        ID: 1,
        sessionID: "Development Session",
        userID: 1,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      },
    ])
    .execute();

  await sql`SELECT setval((SELECT pg_get_serial_sequence('session', 'ID')), (SELECT MAX("ID") FROM session));`.execute(
    db
  );
};
