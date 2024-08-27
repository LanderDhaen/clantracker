import { db } from "../data/index";
import { sql } from "kysely";
import { InsertablePerformance } from "../types/performance";

export const getAllPerformances = async () => {
  const performances = await db
    .with("alltime", (qb) =>
      qb
        .selectFrom("performance")
        .select([
          "performance.accountID",
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
        .groupBy("performance.accountID")
    )
    .with("yearly", (qb) =>
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
    .where("account.isActive", "=", true)
    .orderBy("account.username")
    .execute();

  return performances;
};

export const getPerformancesByCWLID = async (id: number) => {
  const performances = await db
    .selectFrom("performance")
    .selectAll()
    .where("performance.cwlID", "=", id)
    .execute();

  return performances;
};

export const createPerformances = async (
  performances: InsertablePerformance[]
) => {
  await db.insertInto("performance").values(performances).execute();
};
