import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom("user").execute();

  await db
    .insertInto("user")
    .values([
      {
        ID: 1,
        username: "Lander",
        hashedPassword:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      },
      {
        ID: 2,
        username: "Jesse",
        hashedPassword:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      },
    ])
    .execute();
};
