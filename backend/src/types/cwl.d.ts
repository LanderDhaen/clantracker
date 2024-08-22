import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { MonthValue } from "../data/enums/months";
import { PlacementTypeValue } from "../data/enums/placementTypes";

export interface CWLTable {
  ID: Generated<number>;
  createdAt: ColumnType<Date>;
  updatedAt: ColumnType<Date>;
  isActive: ColumnType<boolean>;
  month: ColumnType<MonthValue>;
  year: ColumnType<number>;
  league: ColumnType<number>;
  placement: ColumnType<number>;
  placementType: ColumnType<PlacementTypeValue>;
  clanID: ColumnType<number>;
}

export type CWL = Selectable<CWLTable>;
export type InsertableCWL = Insertable<CWLTable>;
export type UpdateableCWL = Updateable<CWLTable>;
