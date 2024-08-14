import * as clanService from "../services/clan";

export const getAllClans = async () => {
  return clanService.getAllClans();
};

export const checkClanExists = async (id: number) => {
  return clanService.checkClanExists(id);
};

export const getClanByID = async (id: number) => {
  return clanService.getClanByID(id);
};
