const clanService = require("../services/clan");

const getAllClans = async () => {
  return clanService.getAllClans();
};

module.exports = {
  getAllClans,
};
