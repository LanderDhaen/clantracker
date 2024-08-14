import { tables, db } from "../data/index";
import { sql } from "kysely";

/*

export const getAllPerformances = async () => {
  const performances = await getKnex()(tables.performance)
    .join(
      tables.account,
      `${tables.performance}.accountID`,
      `${tables.account}.ID`
    )
    .join(tables.cwl, `${tables.performance}.cwlID`, `${tables.cwl}.ID`)
    .join(
      tables.townhall,
      `${tables.account}.townhallID`,
      `${tables.townhall}.ID`
    )
    .select([
      `${tables.performance}.ID`,
      `${tables.performance}.attacks`,
      `${tables.performance}.stars`,
      `${tables.performance}.damage`,
      `${tables.cwl}.month`,
      `${tables.cwl}.year`,
      `${tables.account}.username as account`,
      `${tables.account}.ID as accountID`,
      `${tables.townhall}.level as townhall`,
    ]);

  const aggregatedData = performances.reduce((acc, performance) => {
    const { accountID, account, townhall, year, attacks, stars, damage } =
      performance;

    if (!acc[accountID]) {
      acc[accountID] = {
        accountID,
        account,
        townhall,
        totalStars: 0,
        totalDamage: 0,
        totalAttacks: 0,
        years: {},
      };
    }

    if (!acc[accountID].years[year]) {
      acc[accountID].years[year] = { stars: 0, damage: 0, attacks: 0 };
    }

    acc[accountID].years[year].stars += stars;
    acc[accountID].years[year].damage += damage;
    acc[accountID].years[year].attacks += attacks;

    acc[accountID].totalStars += stars;
    acc[accountID].totalDamage += damage;
    acc[accountID].totalAttacks += attacks;

    return acc;
  }, {});

  const results = Object.values(aggregatedData).map((accountData) => {
    const {
      accountID,
      account,
      townhall,
      totalStars,
      totalDamage,
      totalAttacks,
      years,
    } = accountData;

    const yearPerformances = Object.entries(years).reduce(
      (acc, [year, data]) => {
        acc[year] = {
          totalStars: data.stars,
          avgStars: parseFloat((data.stars / data.attacks).toFixed(1)),
          totalDamage: data.damage,
          avgDamage: parseFloat((data.damage / data.attacks).toFixed(0)),
          totalAttacks: data.attacks,
        };
        return acc;
      },
      {}
    );

    return {
      accountID,
      account,
      townhall,
      alltime: {
        totalStars: totalStars,
        avgStars: parseFloat((totalStars / totalAttacks).toFixed(1)),
        totalDamage: totalDamage,
        avgDamage: parseFloat((totalDamage / totalAttacks).toFixed(0)),
        totalAttacks: totalAttacks,
      },
      ...yearPerformances,
    };
  });

  return results;

  */

export const getAllPerformances = async () => {
  const result = await db
    .with("alltime", (qb) =>
      qb
        .selectFrom("performance")
        .select([
          "accountID",
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
        .groupBy("accountID")
    )
    .with("yearly", (qb) =>
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
        .where("cwl.year", "is not", null)
        .groupBy(["performance.accountID", "cwl.year"])
    )
    .selectFrom("account")
    .innerJoin("alltime", "account.ID", "alltime.accountID")
    .innerJoin("yearly", "account.ID", "yearly.accountID")
    .innerJoin("townhall", "account.townhallID", "townhall.ID")
    .select([
      "account.ID",
      "account.username as account",
      "townhall.level as townhall",

      // All-time statistics as JSONB with alias 'alltime'
      sql<{
        totalStars: number;
        avgStars: number;
        totalDamage: number;
        avgDamage: number;
        totalAttacks: number;
      }>`jsonb_build_object(
          'totalStars', alltime.total_stars,
          'avgStars', alltime.avg_stars,
          'totalDamage', alltime.total_damage,
          'avgDamage', alltime.avg_damage,
          'totalAttacks', alltime.total_attacks
        )`.as("alltime"),

      // Yearly statistics as a JSON array
      sql<{
        year: number;
        totalStars: number;
        avgStars: number;
        totalDamage: number;
        avgDamage: number;
        totalAttacks: number;
      }>`jsonb_agg(
          jsonb_build_object(
            'year', yearly.year,
            'totalStars', yearly.total_stars,
            'avgStars', yearly.avg_stars,
            'totalDamage', yearly.total_damage,
            'avgDamage', yearly.avg_damage,
            'totalAttacks', yearly.total_attacks
          )
        )`.as("yearly"),
    ])
    .groupBy([
      "account.ID",
      "account.username",
      "townhall.level",
      "alltime.total_stars",
      "alltime.total_damage",
      "alltime.total_attacks",
      "alltime.avg_stars",
      "alltime.avg_damage",
    ])
    .orderBy(sql`alltime.avg_stars`, "desc")
    .execute();

  return result;
};
