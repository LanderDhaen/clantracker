const { tables, getKnex } = require("../data/index");

const getAllClans = async () => {
  const clans = await getKnex()(tables.clan).select([
    `${tables.clan}.ID`,
    `${tables.clan}.name`,
    `${tables.clan}.level`,
  ]);

  return clans;
};

module.exports = {
  getAllClans,
};
