const { tables, getKnex } = require("../data/index");

const getAllPerformances = async () => {
  const performances = await getKnex()(tables.performance)
    .join(
      tables.account,
      `${tables.performance}.accountID`,
      `${tables.account}.ID`
    )
    .join(tables.cwl, `${tables.performance}.cwlID`, `${tables.cwl}.ID`)
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
      `${tables.account}.username as account`,
      `${tables.account}.ID as accountID`,
      `${tables.townhall}.level as townhall`,
    ]);

  const aggregatedData = performances.reduce((acc, performance) => {
    const { accountID, account, townhall, year, attacks, stars, damage } =
      performance;

    if (!acc[accountID]) {
      acc[accountID] = {
        accountID,
        account,
        townhall,
        totalStars: 0,
        totalDamage: 0,
        totalAttacks: 0,
        years: {},
      };
    }

    if (!acc[accountID].years[year]) {
      acc[accountID].years[year] = { stars: 0, damage: 0, attacks: 0 };
    }

    acc[accountID].years[year].stars += stars;
    acc[accountID].years[year].damage += damage;
    acc[accountID].years[year].attacks += attacks;

    acc[accountID].totalStars += stars;
    acc[accountID].totalDamage += damage;
    acc[accountID].totalAttacks += attacks;

    return acc;
  }, {});

  const results = Object.values(aggregatedData).map((accountData) => {
    const {
      accountID,
      account,
      townhall,
      totalStars,
      totalDamage,
      totalAttacks,
      years,
    } = accountData;

    const yearPerformances = Object.entries(years).reduce(
      (acc, [year, data]) => {
        acc[year] = {
          totalStars: data.stars,
          avgStars: parseFloat((data.stars / data.attacks).toFixed(1)),
          totalDamage: data.damage,
          avgDamage: parseFloat((data.damage / data.attacks).toFixed(0)),
          totalAttacks: data.attacks,
        };
        return acc;
      },
      {}
    );

    return {
      accountID,
      account,
      townhall,
      alltime: {
        totalStars: totalStars,
        avgStars: parseFloat((totalStars / totalAttacks).toFixed(1)),
        totalDamage: totalDamage,
        avgDamage: parseFloat((totalDamage / totalAttacks).toFixed(0)),
        totalAttacks: totalAttacks,
      },
      ...yearPerformances,
    };
  });

  return results;
};

module.exports = {
  getAllPerformances,
};
