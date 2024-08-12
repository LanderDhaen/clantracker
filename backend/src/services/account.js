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
      `${tables.account}.nationality as nationality`,
      `${tables.clan}.name as clan`,
      `${tables.clan}.ID as clanID`,
      `${tables.townhall}.level as townhall`,
      "main.username as main",
    ])
    .orderBy(`${tables.account}.username`);

  return accounts;
};

const getMainAccounts = async () => {
  const accounts = await getKnex()(tables.account)
    .join(
      tables.townhall,
      `${tables.account}.townhallID`,
      `${tables.townhall}.ID`
    )
    .select([
      `${tables.account}.ID`,
      `${tables.account}.username as username`,
      `${tables.townhall}.level as townhall`,
    ])
    .where(`${tables.account}.accountID`, null)
    .where(`${tables.account}.left`, null)
    .orderBy(`${tables.account}.username`);

  return accounts;
};

const getAccountByID = async (id) => {
  const account = await getKnex()(tables.account)
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
    .where(`${tables.account}.ID`, id)
    .select([
      `${tables.account}.ID`,
      `${tables.account}.username as username`,
      `${tables.account}.name as name`,
      `${tables.account}.role as role`,
      `${tables.account}.joined as joined`,
      `${tables.account}.left as left`,
      `${tables.account}.nationality as nationality`,
      `${tables.clan}.name as clanName`,
      `${tables.clan}.level as clanlevel`,
      `${tables.clan}.ID as clanID`,
      `${tables.clan}.location as clanLocation`,
      `${tables.clan}.language as clanLanguage`,
      `${tables.clan}.longestWinStreak`,
      `${tables.clan}.cwl as cwl`,
      `${tables.townhall}.level as townhall`,
      "main.username as main",
      "main.ID as mainID",
    ])
    .first();

  const performances = await getKnex()(tables.performance)
    .where(`${tables.performance}.accountID`, id)
    .join(tables.cwl, `${tables.performance}.cwlID`, `${tables.cwl}.ID`)
    .join(
      tables.account,
      `${tables.performance}.accountID`,
      `${tables.account}.ID`
    )
    .join(
      tables.townhall,
      `${tables.account}.townhallID`,
      `${tables.townhall}.ID`
    )
    .select([
      `${tables.performance}.ID`,
      `${tables.performance}.attacks`,
      `${tables.performance}.stars`,
      `${tables.performance}.damage`,
      `${tables.cwl}.month`,
      `${tables.cwl}.year`,
    ]);

  return {
    ID: account.ID,
    username: account.username,
    name: account.name,
    role: account.role,
    joined: account.joined,
    left: account.left,
    nationality: account.nationality,
    clan: {
      ID: account.clanID,
      name: account.clanName,
      level: account.clanlevel,
      location: account.clanLocation,
      language: account.clanLanguage,
      cwl: account.cwl,
      longestWinStreak: account.longestWinStreak,
    },
    statistics: calculateStatistics(performances).sort(
      (a, b) => b.year - a.year
    ),
    performances: calculateAverages(performances),
  };
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
  await getKnex()(tables.account).insert({
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
  await getKnex()(tables.account).where("ID", id).update(account);
};

// Helper functions

const calculateAverages = (performances) => {
  return performances.map((p) => {
    const avgStars = parseFloat((p.stars / p.attacks).toFixed(1));
    const avgDamage = parseFloat((p.damage / p.attacks).toFixed(0));
    return {
      ...p,
      avgStars,
      avgDamage,
    };
  });
};

const calculateStatistics = (performances) => {
  const aggregatedData = performances.reduce((acc, performance) => {
    const { year, attacks, stars, damage } = performance;

    if (!acc[year]) {
      acc[year] = { stars: 0, damage: 0, attacks: 0 };
    }

    acc[year].stars += stars;
    acc[year].damage += damage;
    acc[year].attacks += attacks;

    return acc;
  }, {});

  return Object.entries(aggregatedData).map(([year, data]) => {
    const avgStars = parseFloat((data.stars / data.attacks).toFixed(1));
    const avgDamage = parseFloat((data.damage / data.attacks).toFixed(0));
    return {
      year,
      stars: data.stars,
      avgStars,
      damage: data.damage,
      avgDamage,
      attacks: data.attacks,
    };
  });
};

module.exports = {
  getAllAccounts,
  getMainAccounts,
  getAccountByID,
  createAccount,
  updateAccount,
};
