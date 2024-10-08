import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

import * as accountController from "../controllers/account";
import { RoleValue } from "../data/enums/roles";

export interface AccountTable {
  ID: Generated<number>;
  createdAt: ColumnType<Date, string>;
  updatedAt: ColumnType<Date, string>;
  isActive: ColumnType<boolean>;
  username: ColumnType<string>;
  name: ColumnType<string> | null;
  role: ColumnType<RoleValue>;
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

export type GetAllAccountsResponse = Awaited<
  ReturnType<typeof accountController.getAllAccounts>
>;

export type GetMainAccountsResponse = Awaited<
  ReturnType<typeof accountController.getMainAccounts>
>;

export type GetAccountByIDResponse = Awaited<
  ReturnType<typeof accountController.getAccountByID>
>;

export type GetAccountDetailsByIDResponse = Awaited<
  ReturnType<typeof accountController.getAccountDetailsByID>
>;
