const townhallService = require("../services/townhall");

const getAllTownHalls = async () => {
  return townhallService.getAllTownHalls();
};

const checkTownhallExists = async (id) => {
  return townhallService.checkTownhallExists(id);
};

const getTownhallByID = async (id) => {
  return townhallService.getTownhallByID(id);
};

module.exports = {
  getAllTownHalls,
  getTownhallByID,
  checkTownhallExists,
};
