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
    .with("stars", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("account", "performance.accountID", "account.ID")
        .innerJoin("townhall", "account.townhallID", "townhall.ID")
        .select([
          "account.username",
          "townhall.level as townhall",
          "performance.stars",
          "performance.attacks",
          sql`ROUND(performance.stars * 1.0 / NULLIF(performance.attacks, 0), 1)`.as(
            "avgstars"
          ),
        ])
        .where("performance.cwlID", "=", id)
        .orderBy("avgstars", "desc")
    )
    .with("damage", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("account", "performance.accountID", "account.ID")
        .innerJoin("townhall", "account.townhallID", "townhall.ID")
        .select([
          "account.username",
          "townhall.level as townhall",
          "performance.damage",
          "performance.attacks",
          sql`ROUND(performance.damage * 1.0 / NULLIF(performance.attacks, 0), 1)`.as(
            "avgdamage"
          ),
        ])
        .where("performance.cwlID", "=", id)
        .orderBy("avgdamage", "desc")
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
          username: string;
          totalStars: number;
          avgStars: number;
          totalAttacks: number;
        }[]
      >`
    COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'username', stars.username,
              'townhall', stars.townhall,
              'stars', stars.stars,
              'attacks', stars.attacks,
              'avgStars', stars.avgstars
            )
          )
          FROM "stars"
        ),
        '[]'
      )
      `.as("stars"),
    ])
    .select(
      sql<
        {
          username: string;
          totalDamage: number;
          avgDamage: number;
          totalAttacks: number;
        }[]
      >`
    COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'username', damage.username,
              'townhall', damage.townhall,
              'damage', damage.damage,
              'attacks', damage.attacks,
              'avgDamage', damage.avgdamage
            )
          )
          FROM "damage"
        ),
        '[]'
      )
      `.as("damage")
    )
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
    statistics: {
      stars: cwl.stars,
      damage: cwl.damage,
    },
  };
};

export const checkCWlExists = async (id: number) => {
  const cwl = await db
    .selectFrom("cwl")
    .where("cwl.ID", "=", id)
    .executeTakeFirst();

  return cwl;
};
