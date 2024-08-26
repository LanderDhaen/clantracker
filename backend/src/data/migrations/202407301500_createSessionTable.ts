import { Kysely } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("session")
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("sessionID", "text", (c) => c.notNull())
    .addColumn("userID", "integer", (c) => c.notNull())
    .addColumn("expiresAt", "timestamp", (c) => c.notNull())
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("session").execute();
};
