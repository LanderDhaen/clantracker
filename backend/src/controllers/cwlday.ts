import { InsertableCWLDay } from "../types/cwlday";
import * as CWLDayService from "../services/cwlday";

export const createCWLDays = async (CWLDays: InsertableCWLDay[]) => {
  await CWLDayService.createCWLDays(CWLDays);
};
