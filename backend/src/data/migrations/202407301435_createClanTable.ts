import { Knex } from "knex";
import { tables } from "..";

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tables.clan, (table) => {
    table.increments("ID");
    table.string("name").notNullable();
    table.integer("level").notNullable();
    table.string("location").notNullable();
    table.string("language").notNullable();
    table.integer("cwl").notNullable();
    table.integer("longestWinStreak").notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable(tables.clan);
};
