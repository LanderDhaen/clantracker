import { Kysely } from "kysely";
import { tables } from "..";
import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tables.account, (table) => {
    table.increments("ID");
    table.string("username").notNullable();
    table.string("name");
    table.integer("role").notNullable();
    table.date("joined").notNullable();
    table.date("left");
    table.string("nationality");

    // Foreign keys

    table.integer("accountID").unsigned();
    table.integer("townhallID").unsigned().notNullable();
    table.integer("clanID").unsigned();

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
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists(tables.account);
};
