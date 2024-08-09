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
  joined,
  left,
  accountID,
  townhallID,
  clanID,
}) => {
  const townhall = await townhallController.getTownhallByID(townhallID);

  if (!townhall) {
    throw ServiceError.notFound(
      `Townhall with ID ${townhallID} does not exist`
    );
  }

  const clan = await clanController.getClanByID(clanID);

  if (!clan) {
    throw ServiceError.notFound(`Clan with ID ${clanID} does not exist`);
  }

  accountService.createAccount({
    username,
    name,
    role,
    joined,
    left,
    accountID,
    townhallID,
    clanID,
  });
};

module.exports = {
  getAllAccounts,
  getMainAccounts,
  getAccountByID,
  createAccount,
};
