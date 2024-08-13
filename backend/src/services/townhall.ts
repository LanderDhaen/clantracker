import { db, tables } from "../data/index";
import {
  InsertableTownhall,
  Townhall,
  UpdateableTownhall,
} from "../types/townhall";

export const getAllTownHalls = async () => {
  const townhalls = await db.selectFrom("townhall").selectAll().execute();

  return townhalls;
};

const checkTownhallExists = async (id: number) => {
  const townhall = await db
    .selectFrom(tables.townhall)
    .selectAll()
    .where("ID", "=", id)
    .executeTakeFirst();

  return townhall;
};

const getTownhallByID = async (id: number) => {
  const townhall = await db
    .selectFrom(tables.townhall)
    .selectAll()
    .where("ID", "=", id)
    .executeTakeFirst();

  return townhall;
};

const createTownhall = async (townhall: InsertableTownhall) => {
  const newTownhall = await db
    .insertInto(tables.townhall)
    .values(townhall)
    .execute();

  return newTownhall;
};

const updateTownhall = async (id: number, townhall: UpdateableTownhall) => {
  const updatedTownhall = await db
    .updateTable(tables.townhall)
    .set(townhall)
    .where("ID", "=", id)
    .execute();

  return updatedTownhall;
};

export default {
  getAllTownHalls,
  checkTownhallExists,
  getTownhallByID,
  createTownhall,
  updateTownhall,
};
