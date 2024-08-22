import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface SessionTable {
  ID: Generated<number>;
  sessionID: ColumnType<string>;
  userID: ColumnType<number>;
  expiresAt: ColumnType<Date>;
}

export type Session = Selectable<SessionTable>;
export type InsertableSession = Insertable<SessionTable>;
export type UpdateableSession = Updateable<SessionTable>;
