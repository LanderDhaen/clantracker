import { db } from "../data/index";
import { sql } from "kysely";
import { PLACEMENTTYPES } from "../data/enums/placementTypes";
import { MonthValue } from "../data/enums/months";
import { RoleValue } from "../data/enums/roles";

export const getAllClans = async () => {
  const clans = await db
    .selectFrom("clan")
    .select([
      "clan.ID",
      "clan.name",
      "clan.level",
      "clan.location",
      "clan.language",
      "clan.cwl",
      "clan.longestWinStreak",
    ])
    .orderBy("name")
    .where("clan.isActive", "=", true)
    .execute();

  return clans;
};

export const checkClanExists = async (id: number) => {
  const clan = await db
    .selectFrom("clan")
    .selectAll()
    .where("ID", "=", id)
    .where("clan.isActive", "=", true)
    .executeTakeFirst();

  return clan;
};

export const getClanByID = async (id: number) => {
  const clan = await db
    .with("townhallDistribution", (qb) =>
      qb
        .selectFrom("account")
        .innerJoin("townhall", "account.townhallID", "townhall.ID")
        .select(["townhall.level", db.fn.count("account.ID").as("amount")])
        .where("account.clanID", "=", id)
        .where("account.isActive", "=", true)
        .groupBy("townhall.level")
        .orderBy("townhall.level")
    )
    .with("nationalityDistribution", (qb) =>
      qb
        .selectFrom("account")
        .select(["account.nationality", db.fn.count("account.ID").as("amount")])
        .where("account.clanID", "=", id)
        .where("account.isActive", "=", true)
        .groupBy("account.nationality")
    )
    .with("roleDistribution", (qb) =>
      qb
        .selectFrom("account")
        .select(["account.role", db.fn.count("account.ID").as("amount")])
        .where("account.clanID", "=", id)
        .where("account.isActive", "=", true)
        .groupBy("account.role")
        .orderBy("account.role")
    )
    .with("cwlDistribution", (qb) =>
      qb
        .selectFrom("cwl")
        .select([
          "year",
          sql`COUNT(CASE WHEN "placementType" = ${PLACEMENTTYPES.PROMOTION} THEN 1 END)`.as(
            "promotions"
          ),
          sql`COUNT(CASE WHEN "placementType" = ${PLACEMENTTYPES.SAFE} THEN 1 END)`.as(
            "safes"
          ),
          sql`COUNT(CASE WHEN "placementType" = ${PLACEMENTTYPES.DEMOTION} THEN 1 END)`.as(
            "demotions"
          ),
        ])
        .where("clanID", "=", id)
        .groupBy("year")
    )
    .with("leagues", (qb) =>
      qb
        .selectFrom("cwl")
        .select(["cwl.year", "cwl.month", "cwl.placement"])
        .where("clanID", "=", id)
    )
    .selectFrom("clan")
    .select([
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
      sql<{ value: number; amount: number }[]>`
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'value', level,
              'amount', amount
            )
          )
          FROM "townhallDistribution"
        ),
        '[]'
      )
    `.as("townhalls"),
      sql<{ value: string; amount: number }[]>`
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'value', nationality,
              'amount', amount
            )
          )
          FROM "nationalityDistribution"
        ),
        '[]'
      )
    `.as("nationalities"),
      sql<{ value: RoleValue; amount: number }[]>`
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'value', role,
              'amount', amount
            )
          )
          FROM "roleDistribution"
        ),
        '[]'
      )
    `.as("roles"),
      sql<
        {
          year: number;
          promotions: number;
          safes: number;
          demotions: number;
        }[]
      >`
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'year', year,
              'promotions', promotions,
              'safes', safes,
              'demotions', demotions
            )
          )
          FROM "cwlDistribution"
        ),
        '[]'
      )
    `.as("statistics"),
      sql<{ year: number; month: MonthValue; placement: number }[]>`
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'year', year,
              'month', month,
              'placement', placement
            )
          )
          FROM "leagues"
        ),
        '[]'
      )
    `.as("leagues"),
    ])
    .where("clan.ID", "=", id)
    .executeTakeFirst();

  return {
    clan: {
      ID: clan.ID,
      createdAt: clan.createdAt,
      updatedAt: clan.updatedAt,
      isActive: clan.isActive,
      name: clan.name,
      abbreviation: clan.abbreviation,
      level: clan.level,
      location: clan.location,
      language: clan.language,
      cwl: clan.cwl,
      longestWinStreak: clan.longestWinStreak,
    },
    townhalls: clan.townhalls,
    nationalities: clan.nationalities,
    roles: clan.roles,
    statistics: clan.statistics,
    leagues: clan.leagues,
  };
};
