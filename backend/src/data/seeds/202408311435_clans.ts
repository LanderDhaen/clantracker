import { Knex } from "knex";
import { tables } from "..";
import LEAGUES from "../enums/leagues";

export const seed = async (knex: Knex) => {
  await knex(tables.clan).del();

  await knex(tables.clan).insert([
    {
      ID: 1,
      name: "Dutch Legion 3",
      level: 25,
      location: "Netherlands",
      language: "Dutch",
      cwl: LEAGUES.CHAMP2,
      longestWinStreak: 17,
    },
    {
      ID: 2,
      name: "Dutch Legion CW",
      level: 10,
      location: "Netherlands",
      language: "Dutch",
      cwl: LEAGUES.MASTER2,
      longestWinStreak: 18,
    },
    {
      ID: 3,
      name: "Dutch Legion 4",
      level: 5,
      language: "Dutch",
      location: "Netherlands",
      cwl: LEAGUES.CRYSTAL2,
      longestWinStreak: 0,
    },
  ]);
};
