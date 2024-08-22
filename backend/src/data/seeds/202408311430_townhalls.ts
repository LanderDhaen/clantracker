import { tables } from "..";
import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom(tables.townhall).execute();

  await db
    .insertInto(tables.townhall)
    .values([
      {
        ID: 1,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        isActive: false,
        level: 1,
      },
      {
        ID: 2,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 2,
      },
      {
        ID: 3,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 3,
      },
      {
        ID: 4,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 4,
      },
      {
        ID: 5,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 5,
      },
      {
        ID: 6,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 6,
      },
      {
        ID: 7,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 7,
      },
      {
        ID: 8,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 8,
      },
      {
        ID: 9,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 9,
      },
      {
        ID: 10,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 10,
      },
      {
        ID: 11,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 11,
      },
      {
        ID: 12,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 12,
      },
      {
        ID: 13,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 13,
      },
      {
        ID: 14,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 14,
      },
      {
        ID: 15,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 15,
      },
      {
        ID: 16,
        createdAt: "2024-07-30 14:30:00",
        updatedAt: "2024-07-30 14:30:00",
        level: 16,
      },
    ])
    .execute();

  // Setting the sequence to the correct value

  await sql`SELECT setval((SELECT pg_get_serial_sequence('townhall', 'ID')), (SELECT MAX("ID") FROM townhall));`.execute(
    db
  );
};
