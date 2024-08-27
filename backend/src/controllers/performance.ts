import * as performanceService from "../services/performance";
import { InsertablePerformance } from "../types/performance";

export const getAllPerformances = async () => {
  return performanceService.getAllPerformances();
};

export const createPerformances = async (
  performances: InsertablePerformance[]
) => {
  await performanceService.createPerformances(performances);
};
