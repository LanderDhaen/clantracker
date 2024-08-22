import { ColumnType, Generated, Selectable } from "kysely";

export interface UserTable {
  ID: Generated<number>;
  createdAt: ColumnType<Date>;
  updatedAt: ColumnType<Date>;
  isActive: ColumnType<boolean>;
  username: ColumnType<string>;
  hashedPassword: ColumnType<string>;
}

export type User = Selectable<UserTable>;
