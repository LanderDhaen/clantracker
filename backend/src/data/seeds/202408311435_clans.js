const { tables } = require("..");
const LEAGUES = require("../enums/leagues");

module.exports = {
  seed: async (knex) => {
    await knex(tables.clan).del();

    await knex(tables.clan).insert([
      {
        ID: 1,
        name: "Dutch Legion 3",
        level: 25,
        location: "Netherlands",
        language: "Dutch",
        cwl: LEAGUES.CHAMP1,
      },
      {
        ID: 2,
        name: "Dutch Legion CW",
        level: 10,
        location: "Netherlands",
        language: "Dutch",
        cwl: LEAGUES.MASTER3,
      },
      {
        ID: 3,
        name: "Dutch Legion 4",
        level: 5,
        language: "Dutch",
        location: "Netherlands",
        cwl: LEAGUES.CRYSTAL2,
      },
    ]);
  },
};
