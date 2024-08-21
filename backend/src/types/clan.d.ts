import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

import * as clanController from "../controllers/clan";

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

export type getAllClansResponse = Awaited<
  ReturnType<typeof clanController.getAllClans>
>;

export type getClanByIDResponse = Awaited<
  ReturnType<typeof clanController.getClanByID>
>;
