import { sql } from "kysely";
import { db } from "../data/index";
import { InsertableAccount, UpdateableAccount } from "../types/account";

export const getAllAccounts = async () => {
  const accounts = await db
    .selectFrom("account")
    .innerJoin("clan", "account.clanID", "clan.ID")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .leftJoin("account as main", "account.accountID", "main.ID")
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
    .execute();

  return accounts;
};

export const getMainAccounts = async () => {
  const accounts = await db
    .selectFrom("account")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .select(["account.ID", "account.username", "townhall.level as townhall"])
    .where("account.accountID", "is", null)
    .where("account.left", "is", null)
    .orderBy("account.username")
    .execute();

  return accounts;
};

export const getAccountByID = async (id: number) => {
  const account = await db
    .with("performances", (qb) =>
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
    .with("alltime", (qb) =>
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
        .where("performance.accountID", "=", id)
        .groupBy(["performance.accountID", "cwl.year"])
    )
    .selectFrom("account")
    .leftJoin("townhall", "account.townhallID", "townhall.ID")
    .leftJoin("clan", "account.clanID", "clan.ID")
    .select([
      "account.ID",
      "account.username",
      "account.name",
      "account.role",
      "account.joined",
      "account.left",
      "account.nationality",
      "account.accountID",
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
      }>`
      COALESCE(
        (
          SELECT jsonb_agg(
            DISTINCT jsonb_build_object(
              'year', alltime.year,
              'totalStars', alltime.total_stars,
              'avgStars', alltime.avg_stars,
              'totalDamage', alltime.total_damage,
              'avgDamage', alltime.avg_damage,
              'totalAttacks', alltime.total_attacks
            )
          )
          FROM "alltime"
        ),
        '[]'
      )
      `.as("statistics"),
      sql<{
        month: number;
        year: number;
        stars: number;
        damage: number;
        attacks: number;
        avgStars: number;
        avgDamage: number;
      }>`
      COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'month', performances.month,
              'year', performances.year,
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
    .where("account.ID", "=", id)
    .executeTakeFirst();

  return {
    ID: account.ID,
    username: account.username,
    name: account.name,
    role: account.role,
    joined: account.joined,
    left: account.left,
    nationality: account.nationality,
    townhall: account.townhall,
    mainID: account.accountID,
    clan: {
      ID: account.clanID,
      name: account.clanName,
      level: account.clanLevel,
      location: account.clanLocation,
      language: account.clanLanguage,
      cwl: account.cwl,
      longestWinStreak: account.longestWinStreak,
    },
    statistics: account.statistics,
    performances: account.performances,
  };
};

export const createAccount = async (account: InsertableAccount) => {
  await db.insertInto("account").values(account).execute();
};

export const updateAccount = async (id: number, account: UpdateableAccount) => {
  await db.updateTable("account").set(account).where("ID", "=", id).execute();
};
