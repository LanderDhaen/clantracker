const c = require("config");
const townhallService = require("../services/townhall");

const getAllTownHalls = async () => {
  return townhallService.getAllTownHalls();
};

const getTownhallByID = async (id) => {
  return townhallService.getTownhallByID(id);
};

module.exports = {
  getAllTownHalls,
  getTownhallByID,
};
