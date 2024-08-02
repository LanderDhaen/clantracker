const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.account, (table) => {
      table.increments("ID");
      table.string("username").notNullable();
      table.string("name");
      table.integer("role").notNullable();
      table.date("joined").notNullable();
      table.date("left");

      // Foreign keys

      table.integer("accountID").unsigned();
      table.integer("townhallID").unsigned().notNullable();
      table.integer("clanID").unsigned().notNullable();

      table
        .foreign("accountID", "fk_account_main")
        .references(`${tables.account}.ID`)
        .onDelete("CASCADE");

      table
        .foreign("townhallID", "fk_account_townhall")
        .references(`${tables.townhall}.ID`)
        .onDelete("CASCADE");

      table
        .foreign("clanID", "fk_account_clan")
        .references(`${tables.clan}.ID`)
        .onDelete("CASCADE");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.account);
  },
};
