import ServiceError from "../middleware/serviceError";
import * as clanService from "../services/clan";

export const getAllClans = async () => {
  return clanService.getAllClans();
};

export const getClanByID = async (id: number) => {
  await clanService.checkClanExists;
  return clanService.getClanByID(id);
};

export const getClanDetailsByID = async (id: number) => {
  await clanService.checkClanExists(id);
  return clanService.getClanDetailsByID(id);
};

export const checkClanExists = async (id: number) => {
  const clan = clanService.checkClanExists(id);

  if (!clan) {
    throw ServiceError.notFound(`Clan with ID ${id} does not exist`);
  }
};
