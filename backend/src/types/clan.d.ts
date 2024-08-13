import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ClanTable {
  ID: Generated<number>;
  name: ColumnType<string>;
  level: ColumnType<number>;
  location: ColumnType<string>;
  language: ColumnType<string>;
  cwl: ColumnType<number>;
  longestWinStreak: ColumnType<number>;
}

export type Clan = Selectable<ClanTable>;
export type InsertableClan = Insertable<ClanTable>;
export type UpdateableClan = Updateable<ClanTable>;
