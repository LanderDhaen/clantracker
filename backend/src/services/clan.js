const { tables, getKnex } = require("../data/index");

const getAllClans = async () => {
  const clans = await getKnex()(tables.clan)
    .select([
      `${tables.clan}.ID`,
      `${tables.clan}.name`,
      `${tables.clan}.level`,
      `${tables.clan}.location`,
      `${tables.clan}.language`,
      `${tables.clan}.cwl`,
    ])
    .orderBy(`${tables.clan}.name`);

  return clans;
};

const getClanByID = async (id) => {
  const clan = await getKnex()(tables.clan)
    .select([
      `${tables.clan}.ID`,
      `${tables.clan}.name`,
      `${tables.clan}.level`,
    ])
    .where(`${tables.clan}.ID`, id)
    .first();

  return clan;
};

module.exports = {
  getAllClans,
  getClanByID,
};
