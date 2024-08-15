import { tables } from "..";
import { PLACEMENTTYPES } from "../enums/placementTypes";
import { LEAGUES } from "../enums/leagues";
import { MONTHS } from "../enums/months";
import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom(tables.cwl).execute();

  await db
    .insertInto(tables.cwl)
    .values([
      {
        ID: 1,
        month: MONTHS.JULY,
        year: 2023,
        league: LEAGUES.MASTER2,
        placement: 4,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 2,
        month: MONTHS.AUGUST,
        year: 2023,
        league: LEAGUES.MASTER2,
        placement: 4,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 3,
        month: MONTHS.SEPTEMBER,
        year: 2023,
        league: LEAGUES.MASTER2,
        placement: 7,
        placementType: PLACEMENTTYPES.DEMOTION,
        clanID: 1,
      },
      {
        ID: 4,
        month: MONTHS.OCTOBER,
        year: 2023,
        league: LEAGUES.MASTER3,
        placement: 1,
        placementType: PLACEMENTTYPES.PROMOTION,
        clanID: 1,
      },
      {
        ID: 5,
        month: MONTHS.NOVEMBER,
        year: 2023,
        league: LEAGUES.MASTER2,
        placement: 3,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 6,
        month: MONTHS.DECEMBER,
        year: 2023,
        league: LEAGUES.MASTER2,
        placement: 1,
        placementType: PLACEMENTTYPES.PROMOTION,
        clanID: 1,
      },
      {
        ID: 7,
        month: MONTHS.JANUARY,
        year: 2024,
        league: LEAGUES.MASTER1,
        placement: 3,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 8,
        month: MONTHS.FEBRUARY,
        year: 2024,
        league: LEAGUES.MASTER1,
        placement: 4,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 9,
        month: MONTHS.MARCH,
        year: 2024,
        league: LEAGUES.MASTER1,
        placement: 1,
        placementType: PLACEMENTTYPES.PROMOTION,
        clanID: 1,
      },
      {
        ID: 10,
        month: MONTHS.APRIL,
        year: 2024,
        league: LEAGUES.CHAMP3,
        placement: 2,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 11,
        month: MONTHS.APRIL,
        year: 2024,
        league: LEAGUES.MASTER1,
        placement: 8,
        placementType: PLACEMENTTYPES.DEMOTION,
        clanID: 2,
      },
      {
        ID: 12,
        month: MONTHS.MAY,
        year: 2024,
        league: LEAGUES.CHAMP3,
        placement: 1,
        placementType: PLACEMENTTYPES.PROMOTION,
        clanID: 1,
      },
      {
        ID: 13,
        month: MONTHS.MAY,
        year: 2024,
        league: LEAGUES.MASTER2,
        placement: 6,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 2,
      },
      {
        ID: 14,
        month: MONTHS.JUNE,
        year: 2024,
        league: LEAGUES.CHAMP2,
        placement: 4,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 15,
        month: MONTHS.JUNE,
        year: 2024,
        league: LEAGUES.MASTER2,
        placement: 4,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 2,
      },
      {
        ID: 16,
        month: MONTHS.JULY,
        year: 2024,
        league: LEAGUES.CHAMP2,
        placement: 2,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 1,
      },
      {
        ID: 17,
        month: MONTHS.JULY,
        year: 2024,
        league: LEAGUES.MASTER2,
        placement: 5,
        placementType: PLACEMENTTYPES.SAFE,
        clanID: 2,
      },
    ])
    .execute();

  // Setting the sequence to the correct value

  await sql`SELECT setval((SELECT pg_get_serial_sequence('cwl', 'ID')), (SELECT MAX("ID") FROM cwl));`.execute(
    db
  );
};
