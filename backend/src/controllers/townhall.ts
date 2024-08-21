import ServiceError from "../middleware/serviceError";
import * as townhallService from "../services/townhall";
import { InsertableTownhall, UpdateableTownhall } from "../types/townhall";

export const getAllTownhalls = async () => {
  return townhallService.getAllTownhalls();
};

export const checkTownhallExists = async (id: number) => {
  const townhall = await townhallService.checkTownhallExists(id);
  if (!townhall) {
    throw ServiceError.notFound(`Townhall with ID ${id} does not exist`);
  }
};

export const getTownhallByID = async (id: number) => {
  return townhallService.getTownhallByID(id);
};

export const createTownhall = async (townhall: InsertableTownhall) => {
  return townhallService.createTownhall(townhall);
};

export const updateTownhall = async (
  id: number,
  townhall: UpdateableTownhall
) => {
  await checkTownhallExists(id);
  return townhallService.updateTownhall(id, townhall);
};
