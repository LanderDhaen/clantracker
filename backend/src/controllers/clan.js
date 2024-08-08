const clanService = require("../services/clan");

const getAllClans = async () => {
  return clanService.getAllClans();
};

const getClanByID = async (id) => {
  return clanService.getClanByID(id);
};

module.exports = {
  getAllClans,
  getClanByID,
};
