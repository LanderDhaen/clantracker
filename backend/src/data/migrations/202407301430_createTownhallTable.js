const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.townhall, (table) => {
      table.increments("ID");
      table.integer("level").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.townhall);
  },
};
