import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface AccountTable {
  ID: Generated<number>;
  username: ColumnType<string>;
  name: ColumnType<string> | null;
  role: ColumnType<number>;
  joined: ColumnType<Date, string>;
  left: ColumnType<Date, string> | null;
  nationality: ColumnType<string>;
  accountID: ColumnType<number> | null;
  townhallID: ColumnType<number>;
  clanID: ColumnType<number>;
}

export type Account = Selectable<AccountTable>;
export type InsertableAccount = Insertable<AccountTable>;
export type UpdateableAccount = Updateable<AccountTable>;
