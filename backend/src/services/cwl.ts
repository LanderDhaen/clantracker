import { db } from "../data/index";
import { sql } from "kysely";

export const getAllCWLs = async () => {
  const cwls = await db
    .selectFrom("cwl")
    .innerJoin("clan", "cwl.clanID", "clan.ID")
    .select([
      "cwl.ID",
      "cwl.month",
      "cwl.year",
      "cwl.league",
      "cwl.placement",
      "cwl.placementType",
      "clan.ID as clanID",
      "clan.name as clanName",
    ])
    .orderBy("cwl.year desc")
    .orderBy("cwl.month desc")
    .orderBy("clan.ID")
    .execute();

  return cwls;
};

export const getCWLDetailsByID = async (id: number) => {
  const cwl = await db
    .with("performances", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("account", "performance.accountID", "account.ID")
        .select([
          "account.name",
          "performance.stars",
          "performance.damage",
          "performance.attacks",
          sql`ROUND(performance.stars * 1.0 / NULLIF(performance.attacks, 0), 1)`.as(
            "avgstars"
          ),
          sql`ROUND(performance.damage * 1.0 / NULLIF(performance.attacks, 0), 0)`.as(
            "avgdamage"
          ),
        ])
        .where("performance.cwlID", "=", id)
    )
    .selectFrom("cwl")
    .innerJoin("clan", "cwl.clanID", "clan.ID")
    .select([
      "cwl.ID",
      "cwl.updatedAt",
      "cwl.createdAt",
      "cwl.isActive",
      "cwl.month",
      "cwl.year",
      "cwl.league",
      "cwl.placement",
      "cwl.placementType",
      "cwl.size",
      "clan.ID",
      "clan.createdAt",
      "clan.updatedAt",
      "clan.isActive",
      "clan.name",
      "clan.abbreviation",
      "clan.level",
      "clan.location",
      "clan.language",
      "clan.cwl",
      "clan.longestWinStreak",
      sql<
        {
          accountName: string;
          totalStars: number;
          avgStars: number;
          totalDamage: number;
          avgDamage: number;
          totalAttacks: number;
        }[]
      >`
    COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'name', performances.name,
              'stars', performances.stars,
              'damage', performances.damage,
              'attacks', performances.attacks,
              'avgStars', performances.avgstars,
              'avgDamage', performances.avgdamage
            )
          )
          FROM "performances"
        ),
        '[]'
      )
      `.as("performances"),
    ])
    .where("cwl.ID", "=", id)
    .executeTakeFirst();

  return {
    cwl: {
      ID: cwl.ID,
      updatedAt: cwl.updatedAt,
      createdAt: cwl.createdAt,
      isActive: cwl.isActive,
      month: cwl.month,
      year: cwl.year,
      league: cwl.league,
      placement: cwl.placement,
      placementType: cwl.placementType,
      size: cwl.size,
    },
    clan: {
      ID: cwl.ID,
      createdAt: cwl.createdAt,
      updatedAt: cwl.updatedAt,
      isActive: cwl.isActive,
      name: cwl.name,
      abbreviation: cwl.abbreviation,
      level: cwl.level,
      location: cwl.location,
      language: cwl.language,
      cwl: cwl.cwl,
      longestWinStreak: cwl.longestWinStreak,
    },
    performances: cwl.performances,
  };
};

export const checkCWlExists = async (id: number) => {
  const cwl = await db
    .selectFrom("cwl")
    .where("cwl.ID", "=", id)
    .executeTakeFirst();

  return cwl;
};
