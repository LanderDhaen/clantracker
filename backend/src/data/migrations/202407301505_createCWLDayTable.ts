import { Kysely } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("cwlday")
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("createdAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("isActive", "boolean", (c) => c.notNull().defaultTo(true))
    .addColumn("day", "integer", (c) => c.notNull())
    .addColumn("stars", "integer", (c) => c.notNull())
    .addColumn("damage", "decimal", (c) => c.notNull())
    .addColumn("attacks", "integer", (c) => c.notNull())
    .addColumn("starsAgainst", "integer", (c) => c.notNull())
    .addColumn("damageAgainst", "decimal", (c) => c.notNull())
    .addColumn("attacksAgainst", "integer", (c) => c.notNull())
    .addColumn("win", "boolean", (c) => c.notNull())
    .addColumn("cwlID", "integer", (c) =>
      c.notNull().references("cwl.ID").onDelete("cascade")
    )

    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("session").execute();
};
