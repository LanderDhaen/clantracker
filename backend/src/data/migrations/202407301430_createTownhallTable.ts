import { Kysely } from "kysely";
import { tables } from "..";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable(tables.townhall)
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("level", "integer", (c) => c.notNull())
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable(tables.townhall).execute();
};
