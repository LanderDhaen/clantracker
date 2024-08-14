import { Kysely } from "kysely";
import { tables } from "..";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable(tables.account)
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("username", "text", (c) => c.notNull())
    .addColumn("name", "text")
    .addColumn("role", "integer", (c) => c.notNull())
    .addColumn("joined", "date", (c) => c.notNull())
    .addColumn("left", "date")
    .addColumn("nationality", "text")
    .addColumn("clanID", "integer", (c) =>
      c.references(`${tables.clan}.ID`).onDelete("cascade")
    )
    .addColumn("townhallID", "integer", (c) =>
      c.references(`${tables.townhall}.ID`).onDelete("cascade").notNull()
    )
    .addColumn("accountID", "integer", (c) =>
      c.references(`${tables.account}.ID`).onDelete("cascade")
    )
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable(tables.account).execute();
};
