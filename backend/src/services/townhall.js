const { tables, getKnex } = require("../data/index");

const getAllTownHalls = async () => {
  const townhalls = await getKnex()(tables.townhall)
    .select([`${tables.townhall}.ID`, `${tables.townhall}.level`])
    .orderBy(`${tables.townhall}.level`, "desc");

  return townhalls;
};

const checkTownhallExists = async (id) => {
  const townhall = await getKnex()(tables.townhall)
    .select([`${tables.townhall}.ID`])
    .where(`${tables.townhall}.ID`, id)
    .first();

  return townhall;
};

const getTownhallByID = async (id) => {
  const townhall = await getKnex()(tables.townhall)
    .select([`${tables.townhall}.ID`, `${tables.townhall}.level`])
    .where(`${tables.townhall}.ID`, id)
    .first();

  return townhall;
};

module.exports = {
  getAllTownHalls,
  getTownhallByID,
  checkTownhallExists,
};
