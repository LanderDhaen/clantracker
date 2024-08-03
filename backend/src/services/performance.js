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
    const avgStars = stars / attacks;
    const avgDamage = damage / attacks;

    if (!acc[accountID]) {
      acc[accountID] = {
        accountID,
        account,
        townhall,
        totalAvgStars: 0,
        totalAvgDamage: 0,
        count: 0,
      };
    }

    if (!acc[accountID][year]) {
      acc[accountID][year] = { totalAvgStars: 0, totalAvgDamage: 0, count: 0 };
    }

    acc[accountID][year].totalAvgStars += avgStars;
    acc[accountID][year].totalAvgDamage += avgDamage;
    acc[accountID][year].count += 1;

    acc[accountID].totalAvgStars += avgStars;
    acc[accountID].totalAvgDamage += avgDamage;
    acc[accountID].count += 1;

    return acc;
  }, {});

  const results = Object.values(aggregatedData).map((accountData) => {
    const {
      accountID,
      account,
      townhall,
      totalAvgStars,
      totalAvgDamage,
      count,
      ...years
    } = accountData;

    const yearPerformances = Object.entries(years).reduce(
      (acc, [year, data]) => {
        acc[year] = {
          avgStars: parseFloat((data.totalAvgStars / data.count).toFixed(1)),
          avgDamage: parseFloat((data.totalAvgDamage / data.count).toFixed(0)),
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
        avgStars: parseFloat((totalAvgStars / count).toFixed(1)),
        avgDamage: parseFloat((totalAvgDamage / count).toFixed(0)),
      },
      ...yearPerformances,
    };
  });

  return results;
};

module.exports = {
  getAllPerformances,
};
