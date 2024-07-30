const { tables } = require("..");
const ROLETYPES = require("../enums/roleTypes");

module.exports = {
  seed: async (knex) => {
    await knex(tables.account).del();

    await knex(tables.account).insert([
      {
        ID: 1,
        username: "Lander",
        name: "Lander",
        role: ROLETYPES.LEADER,
        joined: "2024-08-31",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 2,
        username: "Lander",
        name: "Lander",
        role: ROLETYPES.COLEADER,
        joined: "2024-08-31",
        accountID: 1,
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 3,
        username: "SyNx_Viiper",
        name: "Lander",
        role: ROLETYPES.COLEADER,
        joined: "2024-08-31",
        accountID: 1,
        townhallID: 14,
        clanID: 1,
      },
    ]);
  },
};
