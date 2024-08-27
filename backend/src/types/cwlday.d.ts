import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface CWLDayTable {
  ID: Generated<number>;
  createdAt: ColumnType<Date>;
  updatedAt: ColumnType<Date>;
  isActive: ColumnType<boolean>;
  day: ColumnType<number>;
  stars: ColumnType<number>;
  damage: ColumnType<number>;
  attacks: ColumnType<number>;
  starsAgainst: ColumnType<number>;
  damageAgainst: ColumnType<number>;
  attacksAgainst: ColumnType<number>;
  win: ColumnType<boolean>;
  cwlID: ColumnType<number>;
}

export type CWLDay = Selectable<CWLDayTable>;
export type InsertableCWLDay = Insertable<CWLDayTable>;
export type UpdateableCWLDay = Updateable<CWLDayTable>;
