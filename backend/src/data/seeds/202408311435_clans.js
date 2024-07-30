const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.clan).del();

    await knex(tables.clan).insert([
      {
        ID: 1,
        name: "Dutch Legion 3",
        level: 25,
      },
      {
        ID: 2,
        name: "Dutch Legion CW",
        level: 10,
      },
      {
        ID: 3,
        name: "Dutch Legion 4",
        level: 5,
      },
    ]);
  },
};
