import { Kysely } from "kysely";
import { tables } from "..";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable(tables.clan)
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("createdAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("isActive", "boolean", (c) => c.notNull().defaultTo(true))
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
