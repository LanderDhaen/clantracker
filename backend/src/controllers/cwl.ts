import ServiceError from "../middleware/serviceError";
import * as cwlService from "../services/cwl";
import * as cwlDayController from "./cwlday";
import * as accountController from "./account";
import * as performanceController from "./performance";
import * as clanController from "./clan";
import { CWLData, InsertableCWL, WarTag } from "../types/cwl";
import { format } from "date-fns";

export const getAllCWLs = async () => {
  return cwlService.getAllCWLs();
};

export const getCWLDetailsByID = async (id: number) => {
  await checkCWlExists(id);

  return cwlService.getCWLDetailsByID(id);
};

export const checkCWlExists = async (id: number) => {
  const cwl = await cwlService.checkCWlExists(id);

  if (!cwl) {
    throw ServiceError.notFound(`CWL with ID ${id} does not exist`);
  }
};

export const createCWL = async (cwl: InsertableCWL) => {
  // Checking if a CWL for the given month, year and clan already exists

  // Getting the Clan Tag

  const targetClanTag = (await clanController.getClanByID(cwl.clanID)).tag;
  const month = format(new Date(cwl.year, cwl.month - 1), "yyyy-MM");

  // Fetch the data and ensure it's awaited before further processing

  const data: CWLData = await fetch(
    `https://api.clashking.xyz/cwl/${encodeURIComponent(
      targetClanTag
    )}/${month}`
  ).then((res) => res.json());

  const rank = data.clan_rankings.find((rank) => rank.tag === targetClanTag);

  // Creating the CWL object

  const newCWL = await cwlService.createCWL({
    month: cwl.month,
    year: cwl.year,
    league: cwl.league,
    placement:
      data.clan_rankings.findIndex((clan) => clan.tag === targetClanTag) + 1,
    placementType: cwl.placementType,
    stars: rank.stars,
    damage: rank.destruction,
    size: cwl.size,
    clanID: cwl.clanID,
  });

  // Getting the war tags for the clan

  const warTags = data.rounds.flatMap((round) =>
    round.warTags.filter(
      (war) =>
        war.clan.tag === targetClanTag || war.opponent.tag === targetClanTag
    )
  );

  // Creating the cwlDays

  const cwlDays = await formatCWLDays(newCWL.ID, warTags, targetClanTag);

  await cwlDayController.createCWLDays(cwlDays);

  // Creating the performances

  const performances = await formatPerformances(
    newCWL.ID,
    warTags,
    targetClanTag
  );

  await performanceController.createPerformances(performances);

  return cwlService.getCWLDetailsByID(newCWL.ID);
};

const formatCWLDays = async (
  cwlID: number,
  warTags: WarTag[],
  targetClanTag: string
) => {
  const cwlDays = warTags.map((warTag, index) => {
    const day = index + 1;

    const isClan = warTag.clan.tag === targetClanTag;
    const myClan = isClan ? warTag.clan : warTag.opponent;
    const opponentClan = isClan ? warTag.opponent : warTag.clan;

    return {
      cwlID: cwlID,
      stars: myClan.stars,
      damage: parseFloat(myClan.destructionPercentage.toFixed(1)),
      attacks: myClan.attacks,
      starsAgainst: opponentClan.stars,
      damageAgainst: parseFloat(opponentClan.destructionPercentage.toFixed(1)),
      attacksAgainst: opponentClan.attacks,
      win: myClan.stars > opponentClan.stars,
      day: day,
    };
  });

  return cwlDays;
};

const formatPerformances = async (
  cwlID: number,
  warTags: WarTag[],
  targetClanTag: string
) => {
  const memberDataMap: Record<string, any> = {};

  // Use a for...of loop for asynchronous operations
  for (const warTag of warTags) {
    const isClan = warTag.clan.tag === targetClanTag;
    const myClan = isClan ? warTag.clan : warTag.opponent;

    for (const member of myClan.members) {
      if (!memberDataMap[member.tag]) {
        // Await the asynchronous function call
        const ID = await getIDFromTag(member.tag);

        memberDataMap[member.tag] = {
          accountID: ID,
          attacks: 0,
          stars: 0,
          damage: 0,
          cwlID: cwlID,
        };
      }

      const memberData = memberDataMap[member.tag];

      // Accumulate attack data
      for (const attack of member.attacks) {
        memberData.attacks += 1;
        memberData.stars += attack.stars;
        memberData.damage += attack.destructionPercentage;
      }
    }
  }

  return Object.values(memberDataMap);
};

const getIDFromTag = async (tag: string) => {
  const account = await accountController.getAccountByTag(tag);
  return account.ID;
};
