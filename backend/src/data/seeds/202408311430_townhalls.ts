import { tables } from "..";
import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom(tables.townhall).execute();

  await db
    .insertInto(tables.townhall)
    .values([
      {
        ID: 1,
        level: 1,
      },
      {
        ID: 2,
        level: 2,
      },
      {
        ID: 3,
        level: 3,
      },
      {
        ID: 4,
        level: 4,
      },
      {
        ID: 5,
        level: 5,
      },
      {
        ID: 6,
        level: 6,
      },
      {
        ID: 7,
        level: 7,
      },
      {
        ID: 8,
        level: 8,
      },
      {
        ID: 9,
        level: 9,
      },
      {
        ID: 10,
        level: 10,
      },
      {
        ID: 11,
        level: 11,
      },
      {
        ID: 12,
        level: 12,
      },
      {
        ID: 13,
        level: 13,
      },
      {
        ID: 14,
        level: 14,
      },
      {
        ID: 15,
        level: 15,
      },
      {
        ID: 16,
        level: 16,
      },
    ])
    .execute();

  // Resetting sequence

  sql`SELECT setval('${tables.townhall}_id_seq', (SELECT MAX("ID") FROM ${tables.townhall}))`;
};
