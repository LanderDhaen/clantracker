import { db } from "../data/index";
import { sql } from "kysely";
import { CWLDay } from "../types/cwlday";
import { InsertableCWL } from "../types/cwl";
import { MonthValue } from "../data/enums/months";

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
      "cwl.stars",
      "cwl.damage",
      "cwl.size",
      "clan.ID as clanID",
      "clan.name as clanName",
    ])
    .orderBy("cwl.year desc")
    .orderBy("cwl.month desc")
    .orderBy("clan.ID")
    .execute();

  return cwls;
};

export const getCWLByID = async (id: number) => {
  const cwl = await db
    .selectFrom("cwl")
    .selectAll()
    .where("cwl.ID", "=", id)
    .executeTakeFirst();

  return cwl;
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
          "performance.bonus",
          "performance.stars",
          "performance.attacks",
          sql`ROUND(CASE WHEN performance.attacks > 0 THEN performance.stars * 1.0 / performance.attacks ELSE 0 END, 1)`.as(
            "avg_stars"
          ),
        ])
        .where("performance.cwlID", "=", id)
        .orderBy("avg_stars", "desc")
    )
    .with("damage", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("account", "performance.accountID", "account.ID")
        .innerJoin("townhall", "account.townhallID", "townhall.ID")
        .select([
          "account.username",
          "townhall.level as townhall",
          "performance.bonus",
          "performance.damage",
          "performance.attacks",
          sql`ROUND(CASE WHEN performance.attacks > 0 THEN performance.damage * 1.0 / performance.attacks ELSE 0 END, 1)`.as(
            "avg_damage"
          ),
        ])
        .where("performance.cwlID", "=", id)
        .orderBy("avg_damage", "desc")
    )
    .with("townhalls", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("account", "performance.accountID", "account.ID")
        .innerJoin("townhall", "account.townhallID", "townhall.ID")
        .select(["townhall.level", db.fn.count("account.ID").as("amount")])
        .where("performance.cwlID", "=", id)
        .groupBy("townhall.level")
        .orderBy("townhall.level")
    )
    .with("nationalities", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("account", "performance.accountID", "account.ID")
        .select(["account.nationality", db.fn.count("account.ID").as("amount")])
        .where("performance.cwlID", "=", id)
        .groupBy("account.nationality")
    )
    .with("rounds", (qb) =>
      qb
        .selectFrom("cwlday")
        .select([
          "cwlday.ID",
          "cwlday.day",
          "cwlday.stars",
          "cwlday.damage",
          "cwlday.attacks",
          "cwlday.starsAgainst",
          "cwlday.damageAgainst",
          "cwlday.attacksAgainst",
          "cwlday.win",
        ])
        .where("cwlday.cwlID", "=", id)
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
      "cwl.stars as totalStars",
      "cwl.damage as totalDamage",
      "cwl.size",
      "clan.ID as clanID",
      "clan.createdAt as clanCreatedAt",
      "clan.updatedAt as clanUpdatedAt",
      "clan.isActive as clanIsActive",
      "clan.name as clanName",
      "clan.abbreviation as clanAbbreviation",
      "clan.level as clanLevel",
      "clan.location as clanLocation",
      "clan.language as clanLanguage",
      "clan.cwl as clanCWL",
      "clan.longestWinStreak as clanLongestWinStreak",
      sql<
        {
          username: string;
          townhall: number;
          bonus: boolean;
          stars: number;
          avgStars: number;
          attacks: number;
        }[]
      >`
    COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'username', stars.username,
              'townhall', stars.townhall,
              'bonus', stars.bonus,
              'stars', stars.stars,
              'attacks', stars.attacks,
              'avgStars', stars.avg_stars
            )
          )
          FROM "stars"
        ),
        '[]'
      )
      `.as("stars"),
      sql<
        {
          username: string;
          townhall: number;
          bonus: boolean;
          damage: number;
          avgDamage: number;
          attacks: number;
        }[]
      >`
    COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'username', damage.username,
              'townhall', damage.townhall,
              'bonus', damage.bonus,
              'damage', damage.damage,
              'attacks', damage.attacks,
              'avgDamage', damage.avg_damage
            )
          )
          FROM "damage"
        ),
        '[]'
      )
      `.as("damage"),
      sql<{ value: number; amount: number }[]>`
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'value', level,
              'amount', amount
            )
          )
          FROM "townhalls"
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
        FROM "nationalities"
      ),
      '[]'
    )
  `.as("nationalities"),
      sql<CWLDay[]>`
    COALESCE(
      (
        SELECT json_agg(
          json_build_object(
            'ID', "ID",
            'day', day,
            'stars', stars,
            'damage', damage,
            'attacks', attacks,
            'starsAgainst', "starsAgainst",
            'damageAgainst', "damageAgainst",
            'attacksAgainst', "attacksAgainst",
            'win', win
          )
        )
        FROM "rounds"
      ),
      '[]'
    )
  `.as("rounds"),
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
      stars: cwl.totalStars,
      damage: cwl.totalDamage,
      size: cwl.size,
    },
    clan: {
      ID: cwl.clanID,
      createdAt: cwl.clanCreatedAt,
      updatedAt: cwl.clanUpdatedAt,
      isActive: cwl.clanIsActive,
      name: cwl.clanName,
      abbreviation: cwl.clanAbbreviation,
      level: cwl.clanLevel,
      location: cwl.clanLocation,
      language: cwl.clanLanguage,
      cwl: cwl.clanCWL,
      longestWinStreak: cwl.clanLongestWinStreak,
    },
    statistics: {
      stars: cwl.stars,
      damage: cwl.damage,
      townhalls: cwl.townhalls,
      nationalities: cwl.nationalities,
    },
    rounds: cwl.rounds,
  };
};

export const checkCWlExists = async (id: number) => {
  const cwl = await db
    .selectFrom("cwl")
    .where("cwl.ID", "=", id)
    .executeTakeFirst();

  return cwl;
};

export const getCWLByMonthYearClan = async (
  month: MonthValue,
  year: number,
  clanID: number
) => {
  const cwl = await db
    .selectFrom("cwl")
    .selectAll()
    .where("month", "=", month)
    .where("year", "=", year)
    .where("clanID", "=", clanID)
    .executeTakeFirst();

  return cwl;
};

export const createCWL = async (cwl: InsertableCWL) => {
  const newCWL = await db
    .insertInto("cwl")
    .values(cwl)
    .returning("ID")
    .executeTakeFirstOrThrow();

  return newCWL;
};
