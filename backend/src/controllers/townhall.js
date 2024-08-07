const townhallService = require("../services/townhall");

const getAllTownHalls = async () => {
  return townhallService.getAllTownHalls();
};

module.exports = {
  getAllTownHalls,
};
