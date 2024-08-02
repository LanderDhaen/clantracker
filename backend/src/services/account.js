const { tables, getKnex } = require("../data/index");

const getAllAccounts = async () => {
  const accounts = await getKnex()(tables.account)
    .join(tables.clan, `${tables.account}.clanID`, `${tables.clan}.ID`)
    .join(
      tables.townhall,
      `${tables.account}.townhallID`,
      `${tables.townhall}.ID`
    )
    .leftJoin(
      { main: tables.account },
      `${tables.account}.accountID`,
      `main.ID`
    )
    .select([
      `${tables.account}.ID`,
      `${tables.account}.username as username`,
      `${tables.account}.name as name`,
      `${tables.account}.role as role`,
      `${tables.account}.joined as joined`,
      `${tables.account}.left as left`,
      `${tables.clan}.name as clan`,
      `${tables.clan}.ID as clanID`,
      `${tables.townhall}.level as townhall`,
      "main.username as main",
    ]);

  return accounts;
};

module.exports = {
  getAllAccounts,
};
