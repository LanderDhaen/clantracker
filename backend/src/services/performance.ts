import { db } from "../data/index";
import { sql } from "kysely";

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
