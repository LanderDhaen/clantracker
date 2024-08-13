import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface CWLTable {
  ID: Generated<number>;
  month: ColumnType<number>;
  year: ColumnType<number>;
  league: ColumnType<number>;
  placement: ColumnType<number>;
  placementType: ColumnType<number>;
  clanID: ColumnType<number>;
}

export type CWL = Selectable<CWLTable>;
export type InsertableCWL = Insertable<CWLTable>;
export type UpdateableCWL = Updateable<CWLTable>;
