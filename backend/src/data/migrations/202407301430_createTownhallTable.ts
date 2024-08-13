import { Knex } from "knex";
import { tables } from "..";

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tables.townhall, (table) => {
    table.increments("ID");
    table.integer("level").notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable(tables.townhall);
};
