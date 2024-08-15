import { db } from "../data/index";
import { sql } from "kysely";

export const getAllPerformances = async () => {
  const performances = await db
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
    .innerJoin("alltime", "alltime.accountID", "account.ID")
    .leftJoin("townhall", "account.townhallID", "townhall.ID")
    .select([
      "account.ID",
      "account.username as account",
      "townhall.level as townhall",
      sql<{
        totalStars: number;
        avgStars: number;
        totalDamage: number;
        avgDamage: number;
        totalAttacks: number;
      }>`
      COALESCE(
        (
          SELECT jsonb_build_object(
            'totalStars', alltime.total_stars,
            'avgStars', alltime.avg_stars,
            'totalDamage', alltime.total_damage,
            'avgDamage', alltime.avg_damage,
            'totalAttacks', alltime.total_attacks
          )
          FROM "alltime"
          WHERE alltime."accountID" = account."ID"
        ),
        '{}'::jsonb
      )
    `.as("alltime"),
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
            jsonb_build_object(
              'year', yearly.year,
              'totalStars', yearly.total_stars,
              'avgStars', yearly.avg_stars,
              'totalDamage', yearly.total_damage,
              'avgDamage', yearly.avg_damage,
              'totalAttacks', yearly.total_attacks
            )
          )
          FROM "yearly"
          WHERE yearly."accountID" = account."ID"
        ),
        '[]'::jsonb
      )
    `.as("yearly"),
    ])
    .where("account.ID", "is not", null)
    .orderBy("account.username")
    .execute();

  return performances;
};
