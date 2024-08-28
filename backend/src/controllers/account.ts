import * as accountService from "../services/account";
import * as townhallController from "../controllers/townhall";
import * as clanController from "../controllers/clan";

import { InsertableAccount, UpdateableAccount } from "../types/account";
import ServiceError from "../middleware/serviceError";

export const getAllAccounts = async () => {
  return accountService.getAllAccounts();
};

export const getMainAccounts = async () => {
  return accountService.getMainAccounts();
};

export const getAccountByID = async (id: number) => {
  await checkAccountExists(id);

  return accountService.getAccountByID(id);
};

export const getAccountDetailsByID = async (id: number) => {
  await checkAccountExists(id);

  return accountService.getAccountDetailsByID(id);
};

export const getAccountByTag = async (tag: string) => {
  const account = await accountService.getAccountByTag(tag);

  if (!account) {
    throw ServiceError.notFound(`Account with tag ${tag} does not exist`);
  }

  return account;
};

export const createAccount = async (account: InsertableAccount) => {
  await townhallController.getTownhallByID(account.townhallID);
  await clanController.checkClanExists(account.clanID);

  return accountService.createAccount(account);
};

export const updateAccount = async (id: number, account: UpdateableAccount) => {
  await checkAccountExists(id);
  await townhallController.getTownhallByID(account.townhallID);
  await clanController.checkClanExists(account.clanID);

  account.updatedAt = new Date();

  return accountService.updateAccount(id, account);
};

export const checkAccountExists = async (id: number) => {
  const account = await accountService.checkAccountExists(id);

  if (!account) {
    throw ServiceError.notFound(`Account with ID ${id} does not exist`);
  }
};
