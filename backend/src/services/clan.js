const { tables, getKnex } = require("../data/index");
const PLACEMENTTYPES = require("../data/enums/placementTypes");

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

const checkClanExists = async (id) => {
  const clan = await getKnex()(tables.clan)
    .select([`${tables.clan}.ID`])
    .where(`${tables.clan}.ID`, id)
    .first();

  return clan;
};

const getClanByID = async (id) => {
  const clan = await getKnex()(tables.clan)
    .select([
      `${tables.clan}.ID`,
      `${tables.clan}.name`,
      `${tables.clan}.level`,
      `${tables.clan}.location`,
      `${tables.clan}.language`,
      `${tables.clan}.cwl`,
    ])
    .where(`${tables.clan}.ID`, id)
    .first();

  const accounts = await getKnex()(tables.account)
    .join(
      tables.townhall,
      `${tables.account}.townhallID`,
      `${tables.townhall}.ID`
    )
    .select([
      `${tables.account}.ID`,
      `${tables.account}.username as username`,
      `${tables.account}.name as name`,
      `${tables.account}.role as role`,
      `${tables.account}.joined as joined`,
      `${tables.account}.left as left`,
      `${tables.account}.nationality as nationality`,
      `${tables.account}.accountID as main`,
      `${tables.account}.clanID as clanID`,
      `${tables.townhall}.level as townhall`,
    ])
    .where(`${tables.account}.clanID`, id)
    .where(`${tables.account}.left`, null);

  const leagues = await getKnex()(tables.cwl)
    .select([
      `${tables.cwl}.ID`,
      `${tables.cwl}.year`,
      `${tables.cwl}.month`,
      `${tables.cwl}.league`,
      `${tables.cwl}.placement`,
      `${tables.cwl}.placementType`,
    ])
    .where(`${tables.cwl}.clanID`, id);

  const totalAccounts = accounts.length;

  clan.nationalities = calculateDistribution(
    accounts,
    "nationality",
    totalAccounts
  );
  clan.townhalls = calculateDistribution(accounts, "townhall", totalAccounts);
  clan.roles = calculateDistribution(accounts, "role", totalAccounts);
  clan.statistics = calculateLeagueStatistics(leagues);
  clan.leagues = leagues;

  return clan;
};

const calculateDistribution = (accounts, property, total) => {
  const map = accounts.reduce((acc, account) => {
    const key = account[property];
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(map).map(([key, amount]) => ({
    value: key,
    amount,
    percent: parseFloat(((amount / total) * 100).toFixed(0)),
  }));
};

const calculateLeagueStatistics = (leagues) => {
  const aggregatedData = leagues.reduce((acc, league) => {
    const { year, placementType } = league;

    if (!acc[year]) {
      acc[year] = {
        [PLACEMENTTYPES.PROMOTION]: 0,
        [PLACEMENTTYPES.SAFE]: 0,
        [PLACEMENTTYPES.DEMOTION]: 0,
      };
    }

    if (acc[year][placementType] !== undefined) {
      acc[year][placementType]++;
    }

    return acc;
  }, {});

  return Object.entries(aggregatedData).map(([year, data]) => {
    return {
      year,
      promotions: data[PLACEMENTTYPES.PROMOTION],
      safe: data[PLACEMENTTYPES.SAFE],
      demotions: data[PLACEMENTTYPES.DEMOTION],
    };
  });
};

module.exports = {
  getAllClans,
  checkClanExists,
  getClanByID,
};
