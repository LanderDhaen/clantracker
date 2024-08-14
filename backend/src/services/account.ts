import { sql } from "kysely";
import { db } from "../data/index";
import { InsertableAccount, UpdateableAccount } from "../types/account";
import { level } from "winston";

export const getAllAccounts = async () => {
  const accounts = await db
    .selectFrom("account")
    .innerJoin("clan", "account.clanID", "clan.ID")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .leftJoin("account as main", "account.ID", "main.ID")
    .select([
      "account.ID",
      "account.username",
      "account.name",
      "account.role",
      "account.joined",
      "account.left",
      "account.nationality",
      "clan.name as clan",
      "clan.ID as clanID",
      "townhall.level as townhall",
      "main.username as main",
    ])
    .orderBy("account.username")
    .execute();

  return accounts;
};

export const getMainAccounts = async () => {
  const accounts = await db
    .selectFrom("account")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .select(["account.ID", "account.username", "townhall.level as townhall"])
    .where("account.accountID", "=", null)
    .where("account.left", "=", null)
    .orderBy("account.username")
    .execute();

  return accounts;
};

export const getAccountByID = async (id: number) => {
  const results = await db
    .with("performance_data", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("cwl", "performance.cwlID", "cwl.ID")
        .select([
          "performance.accountID",
          "performance.stars",
          "performance.damage",
          "performance.attacks",
          "cwl.month",
          "cwl.year",
          sql`ROUND(performance.stars * 1.0 / NULLIF(performance.attacks, 0), 1)`.as(
            "avgstars"
          ),
          sql`ROUND(performance.damage * 1.0 / NULLIF(performance.attacks, 0), 0)`.as(
            "avgdamage"
          ),
        ])
        .where("performance.accountID", "=", id)
    )
    .with("alltime_summary", (qb) =>
      qb
        .selectFrom("performance")
        .innerJoin("cwl", "performance.cwlID", "cwl.ID")
        .select([
          "performance.accountID",
          "cwl.year",
          sql`SUM(stars)`.as("total_stars"),
          sql`SUM(damage)`.as("total_damage"),
          sql`SUM(attacks)`.as("total_attacks"),
          sql`CASE WHEN SUM(attacks) > 0 THEN ROUND(SUM(stars) * 1.0 / SUM(attacks), 1) ELSE NULL END`.as(
            "avg_stars"
          ),
          sql`CASE WHEN SUM(attacks) > 0 THEN ROUND(SUM(damage) * 1.0 / SUM(attacks), 0) ELSE NULL END`.as(
            "avg_damage"
          ),
        ])
        .groupBy(["performance.accountID", "cwl.year"])
    )
    .selectFrom("account")
    .innerJoin("performance_data", "account.ID", "performance_data.accountID")
    .innerJoin("alltime_summary", "account.ID", "alltime_summary.accountID")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .innerJoin("clan", "account.clanID", "clan.ID")
    .select([
      "account.ID",
      "account.username",
      "account.name",
      "account.role",
      "account.joined",
      "account.left",
      "account.nationality",
      "clan.ID as clanID",
      "clan.name as clanName",
      "clan.level as clanLevel",
      "clan.location as clanLocation",
      "clan.language as clanLanguage",
      "clan.cwl as cwl",
      "clan.longestWinStreak as longestWinStreak",
      "townhall.level as townhall",
      sql<{
        year: number;
        totalStars: number;
        avgStars: number;
        totalDamage: number;
        avgDamage: number;
        totalAttacks: number;
      }>`jsonb_agg(
          DISTINCT jsonb_build_object(
            'year', alltime_summary.year,
            'totalStars', alltime_summary.total_stars,
            'avgStars', alltime_summary.avg_stars,
            'totalDamage', alltime_summary.total_damage,
            'avgDamage', alltime_summary.avg_damage,
            'totalAttacks', alltime_summary.total_attacks
          )
        )`.as("statistics"),
      sql<{
        month: number;
        year: number;
        stars: number;
        damage: number;
        attacks: number;
        avgStars: number;
        avgDamage: number;
      }>`jsonb_agg(
        jsonb_build_object(
          'month', performance_data.month,
          'year', performance_data.year,
          'stars', performance_data.stars,
          'damage', performance_data.damage,
          'attacks', performance_data.attacks,
          'avgStars', performance_data.avgstars,
          'avgDamage', performance_data.avgdamage
        )
      )`.as("performances"),
    ])
    .where("account.ID", "=", id)
    .groupBy([
      "account.ID",
      "account.username",
      "account.name",
      "account.role",
      "account.joined",
      "account.left",
      "account.nationality",
      "clan.ID",
      "clan.name",
      "townhall.level",
    ])
    .executeTakeFirst();

  return {
    clan: {
      ID: results.clanID,
      name: results.clanName,
      level: results.clanLevel,
      location: results.clanLocation,
      language: results.clanLanguage,
      cwl: results.cwl,
      longestWinStreak: results.longestWinStreak,
    },
    statistics: results.statistics,
    performances: results.performances,
    account: {
      ID: results.ID,
      username: results.username,
      name: results.name,
      role: results.role,
      joined: results.joined,
      left: results.left,
      nationality: results.nationality,
      townhall: results.townhall,
    },
  };
};

export const createAccount = async (account: InsertableAccount) => {
  await db.insertInto("account").values(account).execute();
};

export const updateAccount = async (id: number, account: UpdateableAccount) => {
  await db.updateTable("account").set(account).where("ID", "=", id).execute();
};
