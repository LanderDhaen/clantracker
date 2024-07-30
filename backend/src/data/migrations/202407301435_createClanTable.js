const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.clan, (table) => {
      table.increments("ID");
      table.string("name").notNullable();
      table.integer("level").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.clan);
  },
};
