const accountService = require("../services/account");

const getAllAccounts = async () => {
  return accountService.getAllAccounts();
};

const getAccountByID = async (id) => {
  return accountService.getAccountByID(id);
};

module.exports = {
  getAllAccounts,
  getAccountByID,
};
