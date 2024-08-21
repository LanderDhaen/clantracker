import { Kysely } from "kysely";
import { tables } from "..";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable(tables.performance)
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("attacks", "integer", (c) => c.notNull())
    .addColumn("stars", "integer", (c) => c.notNull())
    .addColumn("damage", "integer", (c) => c.notNull())
    .addColumn("missed", "boolean", (c) => c.defaultTo(false))
    .addColumn("bonus", "boolean", (c) => c.defaultTo(false))
    .addColumn("cwlID", "integer", (c) =>
      c.notNull().references(`${tables.cwl}.ID`).onDelete("cascade")
    )
    .addColumn("accountID", "integer", (c) =>
      c.notNull().references(`${tables.account}.ID`).onDelete("cascade")
    )
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable(tables.performance).execute();
};
