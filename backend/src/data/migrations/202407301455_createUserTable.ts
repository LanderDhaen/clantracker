import { Kysely } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("user")
    .addColumn("ID", "serial", (c) => c.primaryKey())
    .addColumn("createdAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("isActive", "boolean", (c) => c.notNull().defaultTo(true))
    .addColumn("username", "text", (c) => c.notNull().unique())
    .addColumn("hashedPassword", "text", (c) => c.notNull())
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("user").execute();
};
