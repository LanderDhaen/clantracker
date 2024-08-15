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
        username: "RMBL",
        name: "Bas",
        role: ROLES.COLEADER,
        joined: "2022-04-17",
        nationality: "Dutch",
        accountID: 29,
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 31,
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
        username: "BG_FREEZE",
        role: ROLES.MEMBER,
        joined: "2023-07-11",
        nationality: "Belgian",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 52,
        username: "wolfie",
        role: ROLES.ELDER,
        joined: "2022-01-12",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 53,
        username: "Pak Boli",
        role: ROLES.MEMBER,
        joined: "2023-12-27",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 54,
        username: "Kars",
        name: "Kars",
        role: ROLES.MEMBER,
        joined: "2023-12-04",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 55,
        username: "kroesty",
        role: ROLES.MEMBER,
        joined: "2021-01-10",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 2,
      },
      {
        ID: 56,
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
        username: "Dreamlord",
        name: "Miko",
        role: ROLES.MEMBER,
        joined: "2024-07-15",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 67,
        username: "!President!",
        role: ROLES.MEMBER,
        joined: "2024-01-24",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 68,
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
        username: "Lord Aren",
        role: ROLES.MEMBER,
        joined: "2021-05-31",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 73,
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
        username: "bi3r",
        role: ROLES.MEMBER,
        joined: "2022-12-10",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 75,
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
        username: "Skillrex",
        role: ROLES.MEMBER,
        joined: "2024-01-15",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 79,
        username: "yogibear",
        role: ROLES.MEMBER,
        joined: "2021-08-20",
        nationality: "Dutch",
        townhallID: 15,
        clanID: 1,
      },
      {
        ID: 80,
        username: "piters10",
        role: ROLES.MEMBER,
        joined: "2021-08-03",
        nationality: "Dutch",
        townhallID: 14,
        clanID: 1,
      },
      {
        ID: 81,
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
        username: "z.h.",
        role: ROLES.MEMBER,
        joined: "2021-01-01",
        nationality: "Dutch",
        townhallID: 13,
        clanID: 1,
      },
      {
        ID: 83,
        username: "Gurby Beast",
        role: ROLES.MEMBER,
        joined: "2020-06-15",
        nationality: "Dutch",
        townhallID: 14,
        clanID: 2,
      },
      {
        ID: 84,
        username: "Rukkert",
        role: ROLES.MEMBER,
        joined: "2022-05-25",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 85,
        username: "[SE] Dylan",
        name: "Dylan",
        role: ROLES.MEMBER,
        joined: "2024-07-17",
        nationality: "Dutch",
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 86,
        username: "[SE] Dylan Jr.",
        name: "Dylan",
        role: ROLES.MEMBER,
        joined: "2024-07-17",
        nationality: "Dutch",
        accountID: 85,
        townhallID: 16,
        clanID: 1,
      },
      {
        ID: 87,
        username: "[SE] Dylan Th13",
        name: "Dylan",
        role: ROLES.MEMBER,
        joined: "2024-07-19",
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
