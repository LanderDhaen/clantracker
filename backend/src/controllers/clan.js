const clanService = require("../services/clan");

const getAllClans = async () => {
  return clanService.getAllClans();
};

const checkClanExists = async (id) => {
  return clanService.checkClanExists(id);
};

const getClanByID = async (id) => {
  return clanService.getClanByID(id);
};

module.exports = {
  getAllClans,
  getClanByID,
  checkClanExists,
};
