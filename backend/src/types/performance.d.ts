import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface PerformanceTable {
  ID: Generated<number>;
  attacks: ColumnType<number>;
  stars: ColumnType<number>;
  damage: ColumnType<number>;
  missed: ColumnType<boolean>;
  bonus: ColumnType<boolean>;
  cwlID: ColumnType<number>;
  accountID: ColumnType<number>;
}

export type Performance = Selectable<PerformanceTable>;
export type InsertablePerformance = Insertable<PerformanceTable>;
export type UpdateablePerformance = Updateable<PerformanceTable>;
