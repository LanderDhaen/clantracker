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
      `${tables.account}.name as account`,
      `${tables.account}.ID as accountID`,
      `${tables.townhall}.level as townhall`,
    ]);

  performances.forEach((performance) => {
    performance.average = performance.stars / performance.attacks;
  });

  const aggregatedData = performances.reduce((acc, performance) => {
    const { accountID, account, townhall, year, average } = performance;

    if (!acc[accountID]) {
      acc[accountID] = {
        accountID,
        account,
        townhall,
        performances: {},
        totalAverage: 0,
        count: 0,
      };
    }

    if (!acc[accountID].performances[year]) {
      acc[accountID].performances[year] = {
        year,
        totalAverage: 0,
        count: 0,
      };
    }

    const yearPerformance = acc[accountID].performances[year];
    yearPerformance.totalAverage += average;
    yearPerformance.count += 1;

    const accountData = acc[accountID];
    accountData.totalAverage += average;
    accountData.count += 1;

    return acc;
  }, {});

  const results = Object.values(aggregatedData).map((accountData) => {
    const totalAvg = parseFloat(
      (accountData.totalAverage / accountData.count).toFixed(1)
    );

    const performances = Object.values(accountData.performances).map(
      (performance) => ({
        year: performance.year,
        avg: parseFloat(
          (performance.totalAverage / performance.count).toFixed(1)
        ),
      })
    );

    return {
      accountID: accountData.accountID,
      account: accountData.account,
      townhall: accountData.townhall,
      totalAvg,
      performances,
    };
  });

  return results;
};

module.exports = {
  getAllPerformances,
};
