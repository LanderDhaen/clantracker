import { Knex } from "knex";
import { tables } from "..";

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tables.cwl, (table) => {
    table.increments("ID");
    table.integer("month").notNullable();
    table.integer("year").notNullable();
    table.integer("league").notNullable();
    table.integer("placement").notNullable();
    table.integer("placementType").notNullable();

    // Foreign keys

    table.integer("clanID").unsigned().notNullable();

    table
      .foreign("clanID", "fk_cwl_clan")
      .references(`${tables.clan}.ID`)
      .onDelete("CASCADE");
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists(tables.cwl);
};
