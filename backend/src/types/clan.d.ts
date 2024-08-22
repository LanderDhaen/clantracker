import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

import * as clanController from "../controllers/clan";
import { LeagueValue } from "../data/enums/leagues";

export interface ClanTable {
  ID: Generated<number>;
  createdAt: ColumnType<Date>;
  updatedAt: ColumnType<Date>;
  isActive: ColumnType<boolean>;
  name: ColumnType<string>;
  level: ColumnType<number>;
  location: ColumnType<string>;
  language: ColumnType<string>;
  cwl: ColumnType<LeagueValue>;
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
