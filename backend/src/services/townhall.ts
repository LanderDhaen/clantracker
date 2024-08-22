import { db } from "../data/index";
import { InsertableTownhall, UpdateableTownhall } from "../types/townhall";

export const getAllTownhalls = async () => {
  const townhalls = await db
    .selectFrom("townhall")
    .selectAll()
    .where("townhall.isActive", "=", true)
    .orderBy("townhall.level desc")
    .execute();

  return townhalls;
};

export const checkTownhallExists = async (id: number) => {
  const townhall = await db
    .selectFrom("townhall")
    .selectAll()
    .where("townhall.ID", "=", id)
    .where("townhall.isActive", "=", true)
    .executeTakeFirst();

  return townhall;
};

export const getTownhallByID = async (id: number) => {
  const townhall = await db
    .selectFrom("townhall")
    .selectAll()
    .where("townhall.ID", "=", id)
    .executeTakeFirst();

  return townhall;
};

export const createTownhall = async (townhall: InsertableTownhall) => {
  const newTownhall = await db
    .insertInto("townhall")
    .values(townhall)
    .returning("townhall.ID")
    .executeTakeFirstOrThrow();

  return getTownhallByID(newTownhall.ID);
};

export const updateTownhall = async (
  id: number,
  townhall: UpdateableTownhall
) => {
  const updatedTownhall = await db
    .updateTable("townhall")
    .set(townhall)
    .where("townhall.ID", "=", id)
    .returning("townhall.ID")
    .executeTakeFirstOrThrow();

  return getTownhallByID(updatedTownhall.ID);
};
