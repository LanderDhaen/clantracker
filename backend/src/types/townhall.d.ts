import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

import * as townhallController from "../controllers/townhall";

export interface TownhallTable {
  ID: Generated<number>;
  level: ColumnType<number>;
  createdAt: ColumnType<Date>;
  updatedAt: ColumnType<Date>;
  isActive: ColumnType<boolean>;
}

export type Townhall = Selectable<TownhallTable>;
export type InsertableTownhall = Insertable<TownhallTable>;
export type UpdateableTownhall = Updateable<TownhallTable>;

export type getAllTownhallsResponse = Awaited<
  ReturnType<typeof townhallController.getAllTownhalls>
>;
