import { tables } from "..";
import { ROLES } from "../enums/roles";
import { Kysely, sql } from "kysely";

export const seed = async (db: Kysely<any>) => {
  await db.deleteFrom(tables.account).execute();

  await db
    .insertInto(tables.account)
    .values([
      {
        ID: 1,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8RRG0LJR2",
        username: "Lander",
        name: "Lander",
        role: ROLES.LEADER,
        joined: "2019-03-03",
        nationality: "Belgian",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 2,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#9UQGJYLCV",
        username: "Lander",
        name: "Lander",
        role: ROLES.COLEADER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 3,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#ULP0Y98C",
        username: "SyNx_Viiper",
        name: "Lander",
        role: ROLES.COLEADER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 4,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#RCCVRJPR",
        username: "(FC) Resham",
        name: "Lander",
        role: ROLES.COLEADER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 5,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8UQ9LGYQ",
        username: "LanderTM",
        name: "Lander",
        role: ROLES.ELDER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 16,
        clanID: 2,
      },
      {
        ID: 6,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G2V990J",
        username: "DL Lander",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 13,
        clanID: 2,
      },
      {
        ID: 7,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G2P0LP0LL",
        username: "Lvl.1 Lander",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 12,
        clanID: 2,
      },
      {
        ID: 8,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PULUP0L9",
        username: "FC Gods",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 11,
        clanID: 2,
      },
      {
        ID: 9,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#L2VP2C2P0",
        username: "Lvl.10 Lander",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 10,
        clanID: 2,
      },
      {
        ID: 10,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PUCV28QP9",
        username: "Lvl.9 Lander",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 9,
        clanID: 2,
      },
      {
        ID: 11,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#28U8RUVL",
        username: "Peace",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 9,
        clanID: 2,
      },
      {
        ID: 12,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#QY0RVPYQ",
        username: "Lvl.8 Lander",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 8,
        clanID: 2,
      },
      {
        ID: 13,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YGJL820VP",
        username: "Lander - TH8",
        name: "Lander",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 8,
        clanID: 2,
      },
      {
        ID: 14,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#LYC0RRUUL",
        username: "Lvl.7 Lander",
        name: "Lander",
        role: ROLES.LEADER,
        joined: "2019-03-03",
        nationality: "Belgian",
        accountID: 1,
        townhallID: 7,
        clanID: 2,
      },
      {
        ID: 15,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#R028VRC",
        username: "oppieM",
        name: "Marius",
        role: ROLES.COLEADER,
        joined: "2020-07-09",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 16,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2PVRPVVQQ",
        username: "<oppieM>",
        name: "Marius",
        role: ROLES.COLEADER,
        joined: "2020-07-09",
        nationality: "Dutch",
        accountID: 15,
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 17,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YVRRUGCJV",
        username: "-oppieM-",
        name: "Marius",
        role: ROLES.COLEADER,
        joined: "2020-07-09",
        nationality: "Dutch",
        accountID: 15,
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 18,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PVPV2U0JG",
        username: `"oppieM"`,
        name: "Marius",
        role: ROLES.COLEADER,
        joined: "2020-07-09",
        nationality: "Dutch",
        accountID: 15,
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 19,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G28Y0ULJC",
        username: "Oppie^-^",
        name: "Marius",
        role: ROLES.COLEADER,
        joined: "2020-07-09",
        nationality: "Dutch",
        accountID: 15,
        townhallID: 12,
        clanID: 2,
      },
      {
        ID: 20,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#80JQR8Q9U",
        username: "superclasher",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 21,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#J8QP80L",
        username: "M1chel600",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        accountID: 20,
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 22,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2LQYRYURC",
        username: "fabian",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        accountID: 20,
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 23,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#LYY0R890C",
        username: "fabian2",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        accountID: 20,
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 24,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YCYCGQ8JR",
        username: "thijs2",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        accountID: 20,
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 25,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YU9G90YJQ",
        username: "LV.99 Thijs",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        accountID: 20,
        townhallID: 13,
        clanID: 2,
      },
      {
        ID: 26,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G8CUC8GJG",
        username: "LV.89 Thijs",
        name: "Thijs",
        role: ROLES.COLEADER,
        joined: "2021-04-22",
        nationality: "Dutch",
        accountID: 20,
        townhallID: 11,
        clanID: 2,
      },
      {
        ID: 27,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#L00PRVC",
        username: "Senne",
        name: "Senne",
        role: ROLES.COLEADER,
        joined: "2021-09-04",
        nationality: "Belgian",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 28,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YVCLRY98U",
        username: "Mini Senne",
        name: "Senne",
        role: ROLES.COLEADER,
        joined: "2021-09-04",
        accountID: 27,
        nationality: "Belgian",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 29,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8992RLR8",
        username: "Bas.",
        name: "Bas",
        role: ROLES.MEMBER,
        joined: "2022-04-17",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 30,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8YLJGJ8P0",
        username: "RMBL",
        name: "Bas",
        role: ROLES.COLEADER,
        joined: "2022-04-17",
        left: "2024-07-15",
        nationality: "Dutch",
        accountID: 29,
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 31,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#JYVPCVYP",
        username: "mitchell",
        name: "Mitchell",
        role: ROLES.COLEADER,
        joined: "2021-09-02",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 32,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2PPCVLR2",
        username: "DL DonateTM",
        name: "Mitchell",
        role: ROLES.MEMBER,
        joined: "2021-09-02",
        nationality: "Dutch",
        accountID: 31,
        townhallID: 16,
        clanID: 2,
      },
      {
        ID: 33,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2QVLQGCQC",
        username: "mitchell 2",
        name: "Mitchell",
        role: ROLES.MEMBER,
        joined: "2021-09-02",
        nationality: "Dutch",
        accountID: 31,
        townhallID: 13,
        clanID: 3,
      },
      {
        ID: 34,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#Y92L8Q8J0",
        username: "MitchellTM",
        name: "Mitchell",
        role: ROLES.MEMBER,
        joined: "2021-09-02",
        nationality: "Dutch",
        accountID: 31,
        townhallID: 11,
        clanID: 3,
      },
      {
        ID: 35,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#QPGPVYU80",
        username: "~Mitch~",
        name: "Mitchell",
        role: ROLES.MEMBER,
        joined: "2021-09-02",
        nationality: "Dutch",
        accountID: 31,
        townhallID: 10,
        clanID: 3,
      },
      {
        ID: 36,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2LLVVY9GP",
        username: "Geerard",
        name: "Geerard",
        role: ROLES.COLEADER,
        joined: "2021-07-03",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 37,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#QRRVJRJG",
        username: "Alifoeroe",
        name: "Nardo",
        role: ROLES.COLEADER,
        joined: "2019-02-24",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 38,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#CYPYGGU9",
        username: "Mini Alifoeroe",
        name: "Nardo",
        role: ROLES.MEMBER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 39,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2PPRUGQYC",
        username: "Alifoeroe III",
        name: "Nardo",
        role: ROLES.COLEADER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 40,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8C2RQLQL",
        username: "Alifoeroe IV",
        name: "Nardo",
        role: ROLES.MEMBER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 12,
        clanID: 2,
      },
      {
        ID: 41,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#988P8VY22",
        username: "Alifoeroe V",
        name: "Nardo",
        role: ROLES.MEMBER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 12,
        clanID: 2,
      },
      {
        ID: 42,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#RGGGJ00",
        username: "Manatura",
        name: "Nardo",
        role: ROLES.MEMBER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 10,
        clanID: 2,
      },
      {
        ID: 43,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#C8YURQ88",
        username: "Manatura II",
        name: "Nardo",
        role: ROLES.MEMBER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 10,
        clanID: 2,
      },
      {
        ID: 44,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#9UQ0JQUJY",
        username: "Manatura III",
        name: "Nardo",
        role: ROLES.MEMBER,
        joined: "2019-02-24",
        nationality: "Dutch",
        accountID: 37,
        townhallID: 10,
        clanID: 2,
      },
      {
        ID: 45,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2QGJVUJU",
        username: "VeniVidiVincie",
        name: "Vincent",
        role: ROLES.COLEADER,
        joined: "2021-07-21",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 46,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PGUGUPL2",
        username: "jassie02",
        name: "Jasper",
        role: ROLES.COLEADER,
        joined: "2021-02-11",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 47,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8U8P2RVG",
        username: "Berg",
        name: "Jasper",
        role: ROLES.MEMBER,
        joined: "2021-02-11",
        nationality: "Dutch",
        accountID: 46,
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 48,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YC0000L9R",
        username: "DL Berg",
        name: "Jasper",
        role: ROLES.COLEADER,
        joined: "2021-02-11",
        nationality: "Dutch",
        accountID: 46,
        townhallID: 12,
        clanID: 2,
      },
      {
        ID: 49,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "PCPPPCPV",
        username: "YumZo",
        name: "Jasper",
        role: ROLES.MEMBER,
        joined: "2021-02-11",
        nationality: "Dutch",
        accountID: 46,
        townhallID: 11,
        clanID: 3,
      },
      {
        ID: 50,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PYLLQR29R",
        username: "aapje312",
        name: "Jasper",
        role: ROLES.MEMBER,
        joined: "2021-02-11",
        nationality: "Dutch",
        accountID: 46,
        townhallID: 10,
        clanID: 2,
      },
      {
        ID: 51,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PUVUV80P",
        username: "BG_FREEZE",
        role: ROLES.MEMBER,
        joined: "2023-07-11",
        nationality: "Belgian",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 52,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#UQJ89800",
        username: "wolfie",
        role: ROLES.ELDER,
        joined: "2022-01-12",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 53,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2VVPCQLJ",
        username: "Pak Boli",
        role: ROLES.MEMBER,
        joined: "2023-12-27",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 54,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#9PVGGR08P",
        username: "Kars",
        name: "Kars",
        role: ROLES.COLEADER,
        joined: "2023-12-04",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 55,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#RL22UQ8Q",
        username: "kroesty",
        role: ROLES.MEMBER,
        joined: "2021-01-10",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 2,
      },
      {
        ID: 56,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8L92G8GJJ",
        username: "Anass",
        name: "Anass",
        role: ROLES.MEMBER,
        joined: "2021-09-02",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 2,
      },
      {
        ID: 57,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2RPULQLU",
        username: "DutchApolloHD",
        name: "Tom",
        role: ROLES.ELDER,
        joined: "2024-03-03",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 58,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2PLCRJG2",
        username: "jonasvginkel",
        name: "Jonas",
        role: ROLES.MEMBER,
        joined: "2024-02-15",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 59,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#LPL2QRL92",
        username: "jelle(^o^)",
        name: "Jelle",
        role: ROLES.COLEADER,
        joined: "2023-01-15",
        nationality: "Belgian",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 60,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#Q0QUGJLJR",
        username: "MaGuy",
        name: "Jelle",
        role: ROLES.COLEADER,
        joined: "2023-01-15",
        nationality: "Belgian",
        townhallID: 12,
        clanID: 2,
        accountID: 59,
      },
      {
        ID: 61,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#QLYVRY0JP",
        username: "jelle oy123",
        name: "Jelle",
        role: ROLES.MEMBER,
        joined: "2023-01-15",
        nationality: "Belgian",
        townhallID: 11,
        clanID: 2,
        accountID: 59,
      },
      {
        ID: 62,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G2GYGYU92",
        username: "DL Jelle",
        name: "Jelle",
        role: ROLES.MEMBER,
        joined: "2023-01-15",
        nationality: "Belgian",
        townhallID: 9,
        clanID: 2,
        accountID: 59,
      },
      {
        ID: 63,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G2RVQR090",
        username: "jelle 5",
        name: "Jelle",
        role: ROLES.MEMBER,
        joined: "2023-01-15",
        nationality: "Belgian",
        townhallID: 9,
        clanID: 2,
        accountID: 59,
      },
      {
        ID: 64,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8UY0RYQP",
        username: "Jesse",
        name: "Jesse",
        role: ROLES.COLEADER,
        joined: "2021-07-31",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 65,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G0CLY8VG9",
        username: "Mini Jesse",
        name: "Jesse",
        role: ROLES.MEMBER,
        joined: "2021-07-31",
        nationality: "Dutch",
        accountID: 64,
        townhallID: 12,
        clanID: 2,
      },
      {
        ID: 66,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YL9QLGC0",
        username: "Dreamlord",
        name: "Miko",
        role: ROLES.MEMBER,
        joined: "2024-07-15",
        left: "2024-08-26",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 67,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#89PC0VL",
        username: "!President!",
        role: ROLES.MEMBER,
        joined: "2024-01-24",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 68,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8GGPRPQ",
        username: "Bart",
        name: "Bart",
        role: ROLES.MEMBER,
        joined: "2024-05-19",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 69,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8JYPJ89G",
        username: "Bart2",
        name: "Bart",
        role: ROLES.MEMBER,
        joined: "2024-05-19",
        nationality: "Dutch",
        accountID: 68,
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 70,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YUQR8PGYY",
        username: "Bart3",
        name: "Bart",
        role: ROLES.MEMBER,
        joined: "2024-05-19",
        nationality: "Dutch",
        accountID: 68,
        townhallID: 13,
        clanID: 2,
      },
      {
        ID: 71,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#G00QP2P0L",
        username: "Bart4",
        name: "Bart",
        role: ROLES.MEMBER,
        joined: "2024-05-19",
        nationality: "Dutch",
        accountID: 68,
        townhallID: 11,
        clanID: 2,
      },
      {
        ID: 72,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8099PG8PR",
        username: "Lord Aren",
        role: ROLES.MEMBER,
        joined: "2021-05-31",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 73,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#JG02RC2G",
        username: "rubenvandebuurt",
        name: "Ruben",
        role: ROLES.MEMBER,
        joined: "2021-11-10",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 74,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#YRRCP8GQ",
        username: "bi3r",
        role: ROLES.MEMBER,
        joined: "2022-12-10",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 75,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#L8YR09YL",
        username: "DL Zwekmetino",
        name: "Ino",
        role: ROLES.MEMBER,
        joined: "2021-05-02",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 76,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#2YV2VGLU",
        username: "DL timvdb",
        name: "Tim",
        role: ROLES.MEMBER,
        joined: "2019-03-03",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 77,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        isActive: true,
        tag: "#2LQ0YPP8",
        username: "frank",
        name: "Frank",
        role: ROLES.ELDER,
        joined: "2020-12-29",
        left: "2024-08-01",
        nationality: "Dutch",
        townhallID: 15,
      },
      {
        ID: 78,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#8GJCVPPP",
        username: "Skillrex",
        role: ROLES.MEMBER,
        joined: "2024-01-15",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 79,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#829ULL80V",
        username: "yogibear",
        role: ROLES.MEMBER,
        joined: "2021-08-20",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 80,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#80VPPC8VV",
        username: "piters10",
        role: ROLES.MEMBER,
        joined: "2021-08-03",
        nationality: "Dutch",
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 81,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#9C2C828L",
        username: "Heidi's City",
        name: "Heidi",
        role: ROLES.MEMBER,
        joined: "2021-05-02",
        nationality: "Belgian",
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 82,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#R99JRU08",
        username: "z.h.",
        role: ROLES.MEMBER,
        joined: "2021-01-01",
        nationality: "Dutch",
        townhallID: 13,
        clanID: 1,
      },
      {
        ID: 83,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#PYQPCJ2G",
        username: "Gurby Beast",
        role: ROLES.MEMBER,
        joined: "2020-06-15",
        nationality: "Dutch",
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 84,
        createdAt: "2024-07-30 15:30:00",
        updatedAt: "2024-07-30 15:30:00",
        tag: "#UVUVJJV8",
        username: "Rukkert",
        role: ROLES.MEMBER,
        joined: "2022-05-25",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 85,
        createdAt: "2024-08-15 12:00:00",
        updatedAt: "2024-08-15 12:00:00",
        tag: "#28VRLL9J",
        username: "[SE] Dylan",
        name: "Dylan",
        role: ROLES.MEMBER,
        joined: "2024-07-17",
        left: "2024-08-13",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 86,
        createdAt: "2024-08-15 12:00:00",
        updatedAt: "2024-08-15 12:00:00",
        tag: "#888Y2JG28",
        username: "[SE] Dylan Jr.",
        name: "Dylan",
        role: ROLES.MEMBER,
        joined: "2024-07-17",
        left: "2024-08-13",
        nationality: "Dutch",
        accountID: 85,
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 87,
        createdAt: "2024-08-15 12:00:00",
        updatedAt: "2024-08-15 12:00:00",
        tag: "#V0VLPJP",
        username: "[SE] Dylan Th13",
        name: "Dylan",
        role: ROLES.MEMBER,
        joined: "2024-07-19",
        left: "2024-08-13",
        nationality: "Dutch",
        accountID: 85,
        townhallID: 13,
        clanID: 1,
      },
    ])
    .execute();

  // Setting the sequence to the correct value

  await sql`SELECT setval((SELECT pg_get_serial_sequence('account', 'ID')), (SELECT MAX("ID") FROM account));`.execute(
    db
  );
};
