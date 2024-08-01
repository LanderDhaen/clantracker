const { tables, getKnex } = require("../data/index");

const getAllTownHalls = async () => {
  const townhalls = await getKnex()(tables.townhall).select([
    `${tables.townhall}.ID`,
    `${tables.townhall}.level`,
  ]);

  return townhalls;
};

module.exports = {
  getAllTownHalls,
};
