import { db } from "../data";
import { InsertableCWLDay } from "../types/cwlday";

export const createCWLDays = async (CWLDay: InsertableCWLDay[]) => {
  return db.insertInto("cwlday").values(CWLDay).execute();
};
