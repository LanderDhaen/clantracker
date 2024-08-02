const accountService = require("../services/account");

const getAllAccounts = async () => {
  return accountService.getAllAccounts();
};

module.exports = {
  getAllAccounts,
};
