import { sql } from "kysely";
import { db } from "../data/index";
import { InsertableAccount, UpdateableAccount } from "../types/account";
import { MonthValue } from "../data/enums/months";

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
    .where("account.isActive", "=", true)
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
    .where("account.isActive", "=", true)
    .orderBy("account.username")
    .execute();

  return accounts;
};

export const getAccountByID = async (id: number) => {
  const account = await db
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
      "account.accountID as mainID",
      "clan.ID as clanID",
      "townhall.ID as townhallID",
    ])
    .where("account.ID", "=", id)
    .executeTakeFirst();

  return account;
};

export const getAccountDetailsByID = async (id: number) => {
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
          sql`ROUND(CASE WHEN performance.attacks > 0 THEN performance.stars * 1.0 / performance.attacks ELSE 0 END, 1)`.as(
            "avg_stars"
          ),
          sql`ROUND(CASE WHEN performance.attacks > 0 THEN performance.damage * 1.0 / performance.attacks ELSE 0 END, 1)`.as(
            "avg_damage"
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
          sql`SUM(performance.stars)`.as("total_stars"),
          sql`SUM(performance.damage)`.as("total_damage"),
          sql`SUM(performance.attacks)`.as("total_attacks"),
          sql`ROUND(CASE WHEN SUM(performance.attacks) > 0 THEN SUM(performance.stars) * 1.0 / SUM(performance.attacks) ELSE 0 END, 1)`.as(
            "avg_stars"
          ),
          sql`ROUND(CASE WHEN SUM(performance.attacks) > 0 THEN SUM(performance.damage) * 1.0 / SUM(performance.attacks) ELSE 0 END, 1)`.as(
            "avg_damage"
          ),
        ])
        .where("performance.accountID", "=", id)
        .groupBy(["performance.accountID", "cwl.year"])
    )
    .selectFrom("account")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .innerJoin("clan", "account.clanID", "clan.ID")
    .select([
      "account.ID",
      "account.createdAt",
      "account.updatedAt",
      "account.isActive",
      "account.username",
      "account.name",
      "account.role",
      "account.joined",
      "account.left",
      "account.nationality",
      "account.accountID",
      "clan.ID as clanID",
      "clan.createdAt as clanCreatedAt",
      "clan.updatedAt as clanUpdatedAt",
      "clan.isActive as clanIsActive",
      "clan.name as clanName",
      "clan.abbreviation as clanAbbreviation",
      "clan.level as clanLevel",
      "clan.location as clanLocation",
      "clan.language as clanLanguage",
      "clan.cwl as cwl",
      "clan.longestWinStreak as longestWinStreak",
      "townhall.level as townhall",
      sql<
        {
          year: number;
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
      sql<
        {
          month: MonthValue;
          year: number;
          stars: number;
          damage: number;
          attacks: number;
          avgStars: number;
          avgDamage: number;
        }[]
      >`
      COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'month', performances.month,
              'year', performances.year,
              'stars', performances.stars,
              'damage', performances.damage,
              'attacks', performances.attacks,
              'avgStars', performances.avg_stars,
              'avgDamage', performances.avg_damage
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
    account: {
      ID: account.ID,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      isActive: account.isActive,
      username: account.username,
      name: account.name,
      role: account.role,
      joined: account.joined,
      left: account.left,
      nationality: account.nationality,
      townhall: account.townhall,
      mainID: account.accountID,
    },
    clan: {
      ID: account.clanID,
      createdAt: account.clanCreatedAt,
      updatedAt: account.clanUpdatedAt,
      isActive: account.clanIsActive,
      name: account.clanName,
      abbreviation: account.clanAbbreviation,
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

export const getAccountByTag = async (tag: string) => {
  const account = await db
    .selectFrom("account")
    .select(["ID", "username"])
    .where("tag", "=", tag)
    .where("isActive", "=", true)
    .executeTakeFirst();

  return account;
};

export const createAccount = async (account: InsertableAccount) => {
  const newAccount = await db
    .insertInto("account")
    .values(account)
    .returning("ID")
    .executeTakeFirstOrThrow();

  return getAccountByID(newAccount.ID);
};

export const updateAccount = async (id: number, account: UpdateableAccount) => {
  const updatedAccount = await db
    .updateTable("account")
    .set(account)
    .where("ID", "=", id)
    .returning("ID")
    .executeTakeFirstOrThrow();

  return getAccountByID(updatedAccount.ID);
};

export const checkAccountExists = async (id: number) => {
  const account = await db
    .selectFrom("account")
    .select("ID")
    .where("ID", "=", id)
    .where("isActive", "=", true)
    .executeTakeFirst();

  return account;
};
