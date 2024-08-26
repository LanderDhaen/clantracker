import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom("cwlday").execute();

  await db
    .insertInto("cwlday")
    .values([
      {
        ID: 1,
        day: 1,
        stars: 37,
        damage: 86.5,
        attacks: 15,
        starsAgainst: 35,
        damageAgainst: 89.2,
        attacksAgainst: 14,
        win: true,
        cwlID: 16,
      },
      {
        ID: 2,
        day: 2,
        stars: 37,
        damage: 87.9,
        attacks: 15,
        starsAgainst: 35,
        damageAgainst: 91.4,
        attacksAgainst: 15,
        win: true,
        cwlID: 16,
      },
      {
        ID: 3,
        day: 3,
        stars: 36,
        damage: 88.5,
        attacks: 15,
        starsAgainst: 40,
        damageAgainst: 94.1,
        attacksAgainst: 15,
        win: false,
        cwlID: 16,
      },
      {
        ID: 4,
        day: 4,
        stars: 42,
        damage: 97.5,
        attacks: 15,
        starsAgainst: 33,
        damageAgainst: 88.1,
        attacksAgainst: 15,
        win: true,
        cwlID: 16,
      },
      {
        ID: 5,
        day: 5,
        stars: 40,
        damage: 93.1,
        attacks: 15,
        starsAgainst: 37,
        damageAgainst: 94.4,
        attacksAgainst: 15,
        win: true,
        cwlID: 16,
      },
      {
        ID: 6,
        day: 6,
        stars: 37,
        damage: 88.9,
        attacks: 15,
        starsAgainst: 35,
        damageAgainst: 88.5,
        attacksAgainst: 15,
        win: true,
        cwlID: 16,
      },
      {
        ID: 7,
        day: 7,
        stars: 36,
        damage: 89.3,
        attacks: 15,
        starsAgainst: 35,
        damageAgainst: 89.7,
        attacksAgainst: 15,
        win: true,
        cwlID: 16,
      },
    ])
    .execute();

  await sql`SELECT setval((SELECT pg_get_serial_sequence('cwlday', 'ID')), (SELECT MAX("ID") FROM cwlday));`.execute(
    db
  );
};
