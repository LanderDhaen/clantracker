import { Kysely, sql } from "kysely";
import { tables } from "..";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom(tables.user).execute();

  await db
    .insertInto(tables.user)
    .values([
      {
        ID: 1,
        createdAt: "2024-08-22 11:00:00",
        updatedAt: "2024-08-22 11:00:00",
        username: "Lander",
        hashedPassword:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      },
      {
        ID: 2,
        createdAt: "2024-08-22 11:00:00",
        updatedAt: "2024-08-22 11:00:00",
        username: "Jesse",
        hashedPassword:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      },
      {
        ID: 3,
        createdAt: "2024-08-22 11:00:00",
        updatedAt: "2024-08-22 11:00:00",
        isActive: false,
        username: "frank",
        hashedPassword:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      },
    ])
    .execute();

  await sql`SELECT setval((SELECT pg_get_serial_sequence('user', 'ID')), (SELECT MAX("ID") FROM "user"));`.execute(
    db
  );
};
