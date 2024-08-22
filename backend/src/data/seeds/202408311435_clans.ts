import { tables } from "..";
import { LEAGUES } from "../enums/leagues";
import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom(tables.clan).execute();

  await db
    .insertInto(tables.clan)
    .values([
      {
        ID: 1,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        name: "Dutch Legion 3",
        level: 25,
        location: "Netherlands",
        language: "Dutch",
        cwl: LEAGUES.CHAMP2,
        longestWinStreak: 17,
      },
      {
        ID: 2,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        name: "Dutch Legion CW",
        level: 10,
        location: "Netherlands",
        language: "Dutch",
        cwl: LEAGUES.MASTER2,
        longestWinStreak: 18,
      },
      {
        ID: 3,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        isActive: false,
        name: "Dutch Legion 4",
        level: 5,
        language: "Dutch",
        location: "Netherlands",
        cwl: LEAGUES.CRYSTAL2,
        longestWinStreak: 0,
      },
    ])
    .execute();

  // Setting the sequence to the correct value

  await sql`SELECT setval((SELECT pg_get_serial_sequence('clan', 'ID')), (SELECT MAX("ID") FROM clan));`.execute(
    db
  );
};
