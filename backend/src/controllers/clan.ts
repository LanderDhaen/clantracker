import ServiceError from "../middleware/serviceError";
import * as clanService from "../services/clan";

export const getAllClans = async () => {
  return clanService.getAllClans();
};

export const checkClanExists = async (id: number) => {
  const clan = await clanService.getClanByID(id);

  if (!clan) {
    throw ServiceError.notFound(`Clan with ID ${id} does not exist`);
  }

  return clanService.checkClanExists(id);
};

export const getClanByID = async (id: number) => {
  return clanService.getClanByID(id);
};
