import { Kysely } from "kysely";
import { tables } from "..";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable(tables.cwl)
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("month", "integer", (c) => c.notNull())
    .addColumn("year", "integer", (c) => c.notNull())
    .addColumn("league", "integer", (c) => c.notNull())
    .addColumn("placement", "integer", (c) => c.notNull())
    .addColumn("placementType", "integer", (c) => c.notNull())
    .addColumn("clanID", "integer", (c) =>
      c.notNull().references(`${tables.clan}.ID`).onDelete("cascade")
    )
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable(tables.cwl).execute();
};
