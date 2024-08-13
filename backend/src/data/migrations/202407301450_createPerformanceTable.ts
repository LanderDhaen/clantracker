import { Knex } from "knex";
import { tables } from "..";

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tables.performance, (table) => {
    table.increments("ID");
    table.integer("attacks").notNullable();
    table.integer("stars").notNullable();
    table.integer("damage").notNullable();
    table.boolean("missed").defaultTo(false);
    table.boolean("bonus").defaultTo(false);

    // Foreign keys

    table.integer("cwlID").unsigned().notNullable();
    table.integer("accountID").unsigned().notNullable();

    table
      .foreign("cwlID", "fk_performance_cwl")
      .references(`${tables.cwl}.ID`)
      .onDelete("CASCADE");

    table
      .foreign("accountID", "fk_performance_account")
      .references(`${tables.account}.ID`)
      .onDelete("CASCADE");
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTableIfExists(tables.performance);
};
