import { db, tables } from "../data/index";
import { InsertableTownhall, UpdateableTownhall } from "../types/townhall";

export const getAllTownHalls = async () => {
  const townhalls = await db.selectFrom("townhall").selectAll().execute();

  return townhalls;
};

export const checkTownhallExists = async (id: number) => {
  const townhall = await db
    .selectFrom(tables.townhall)
    .selectAll()
    .where("ID", "=", id)
    .executeTakeFirst();

  return townhall;
};

export const getTownhallByID = async (id: number) => {
  const townhall = await db
    .selectFrom(tables.townhall)
    .selectAll()
    .where("ID", "=", id)
    .executeTakeFirst();

  return townhall;
};

export const createTownhall = async (townhall: InsertableTownhall) => {
  const newTownhall = await db
    .insertInto(tables.townhall)
    .values(townhall)
    .execute();

  return newTownhall;
};

export const updateTownhall = async (
  id: number,
  townhall: UpdateableTownhall
) => {
  const updatedTownhall = await db
    .updateTable(tables.townhall)
    .set(townhall)
    .where("ID", "=", id)
    .execute();

  return updatedTownhall;
};
