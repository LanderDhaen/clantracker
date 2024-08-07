const performanceService = require("../services/performance");

const getAllPerformances = async () => {
  return performanceService.getAllPerformances();
};

module.exports = {
  getAllPerformances,
};
