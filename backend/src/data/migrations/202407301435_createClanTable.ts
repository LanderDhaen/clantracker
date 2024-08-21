import { Kysely } from "kysely";
import { tables } from "..";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable(tables.clan)
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("name", "text", (c) => c.notNull())
    .addColumn("level", "integer", (c) => c.notNull())
    .addColumn("location", "text", (c) => c.notNull())
    .addColumn("language", "text", (c) => c.notNull())
    .addColumn("cwl", "integer", (c) => c.notNull())
    .addColumn("longestWinStreak", "integer", (c) => c.notNull())
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable(tables.clan).execute();
};
