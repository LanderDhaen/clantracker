const accountService = require("../services/account");
const townhallController = require("../controllers/townhall");
const clanController = require("../controllers/clan");

const ServiceError = require("../middleware/serviceError");

const getAllAccounts = async () => {
  return accountService.getAllAccounts();
};

const getMainAccounts = async () => {
  return accountService.getMainAccounts();
};

const getAccountByID = async (id) => {
  return accountService.getAccountByID(id);
};

const createAccount = async ({
  username,
  name,
  role,
  nationality,
  joined,
  left,
  accountID,
  townhallID,
  clanID,
}) => {
  const townhall = await townhallController.checkTownhallExists(townhallID);

  if (!townhall) {
    throw ServiceError.notFound(
      `Townhall with ID ${townhallID} does not exist`
    );
  }

  const clan = await clanController.checkClanExists(clanID);

  if (!clan) {
    throw ServiceError.notFound(`Clan with ID ${clanID} does not exist`);
  }

  accountService.createAccount({
    username,
    name,
    role,
    nationality,
    joined,
    left,
    accountID,
    townhallID,
    clanID,
  });
};

const updateAccount = async (id, account) => {
  const townhall = await townhallController.getTownhallByID(account.townhallID);

  if (!townhall) {
    throw ServiceError.notFound(
      `Townhall with ID ${account.townhallID} does not exist`
    );
  }

  const clan = await clanController.getClanByID(account.clanID);

  if (!clan) {
    throw ServiceError.notFound(
      `Clan with ID ${account.clanID} does not exist`
    );
  }

  accountService.updateAccount(id, account);
};

module.exports = {
  getAllAccounts,
  getMainAccounts,
  getAccountByID,
  createAccount,
  updateAccount,
};
