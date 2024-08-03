const { tables, getKnex } = require("../data/index");
const account = require("../routes/account");
const townhall = require("../routes/townhall");

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

  performances.forEach((performance) => {
    performance.avgStars = performance.stars / performance.attacks;
    performance.avgDamage = performance.damage / performance.attacks;
  });

  const aggregatedData = performances.reduce((acc, performance) => {
    const { accountID, account, townhall, year, avgStars, avgDamage } =
      performance;

    if (!acc[accountID]) {
      acc[accountID] = {
        accountID,
        account,
        townhall,
        performances: {},
        totalAvgStars: 0,
        totalAvgDamage: 0,
        count: 0,
      };
    }

    if (!acc[accountID].performances[year]) {
      acc[accountID].performances[year] = {
        year,
        totalAvgStars: 0,
        totalAvgDamage: 0,
        count: 0,
      };
    }

    const yearPerformance = acc[accountID].performances[year];
    yearPerformance.totalAvgStars += avgStars;
    yearPerformance.totalAvgDamage += avgDamage;
    yearPerformance.count += 1;

    const accountData = acc[accountID];
    accountData.totalAvgStars += avgStars;
    accountData.totalAvgDamage += avgDamage;
    accountData.count += 1;

    return acc;
  }, {});

  const results = Object.values(aggregatedData).map((accountData) => {
    const totalAvgStars = parseFloat(
      (accountData.totalAvgStars / accountData.count).toFixed(1)
    );

    const totalAvgDamage = parseFloat(
      (accountData.totalAvgDamage / accountData.count).toFixed(0)
    );

    const performances = Object.values(accountData.performances).map(
      (performance) => ({
        year: performance.year,
        avgStars: parseFloat(
          (performance.totalAvgStars / performance.count).toFixed(1)
        ),
        avgDamage: parseFloat(
          (performance.totalAvgDamage / performance.count).toFixed(0)
        ),
      })
    );

    return {
      accountID: accountData.accountID,
      account: accountData.account,
      townhall: accountData.townhall,
      totalAvgStars,
      totalAvgDamage,
      performances,
    };
  });

  return results;
};

module.exports = {
  getAllPerformances,
};
