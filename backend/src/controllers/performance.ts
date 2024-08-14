import * as performanceService from "../services/performance";

export const getAllPerformances = async () => {
  return performanceService.getAllPerformances();
};
