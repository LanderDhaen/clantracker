import * as accountService from "../services/account";
import * as townhallController from "../controllers/townhall";
import * as clanController from "../controllers/clan";

import { InsertableAccount, UpdateableAccount } from "../types/account";

export const getAllAccounts = async () => {
  return accountService.getAllAccounts();
};

export const getMainAccounts = async () => {
  return accountService.getMainAccounts();
};

export const getAccountByID = async (id: number) => {
  return accountService.getAccountByID(id);
};

export const createAccount = async (account: InsertableAccount) => {
  await townhallController.getTownhallByID(account.townhallID);
  await clanController.checkClanExists(account.clanID);

  accountService.createAccount(account);
};

export const updateAccount = async (id: number, account: UpdateableAccount) => {
  await townhallController.getTownhallByID(account.townhallID);
  await clanController.checkClanExists(account.clanID);

  accountService.updateAccount(id, account);
};
