import ServiceError from "../middleware/serviceError";
import townhallService from "../services/townhall";
import { InsertableTownhall, UpdateableTownhall } from "../types/townhall";

const getAllTownHalls = async () => {
  return townhallService.getAllTownHalls();
};

const checkTownhallExists = async (id: number) => {
  const townhall = await townhallService.checkTownhallExists(id);
  if (!townhall) {
    throw ServiceError.notFound(`Townhall with ID ${id} does not exist`);
  }
};

const getTownhallByID = async (id: number) => {
  return townhallService.getTownhallByID(id);
};

const createTownhall = async (townhall: InsertableTownhall) => {
  return townhallService.createTownhall(townhall);
};

const updateTownhall = async (id: number, townhall: UpdateableTownhall) => {
  await checkTownhallExists(id);
  return townhallService.updateTownhall(id, townhall);
};

export default {
  getAllTownHalls,
  checkTownhallExists,
  getTownhallByID,
  createTownhall,
  updateTownhall,
};
