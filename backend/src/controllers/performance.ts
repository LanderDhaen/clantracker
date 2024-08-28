import ServiceError from "../middleware/serviceError";
import * as performanceService from "../services/performance";
import * as clanController from "./clan";
import * as accountController from "./account";
import * as cwlController from "./cwl";
import * as clashKingAPI from "../api/clashking";
import { CWLData, InsertableCWL } from "../types/cwl";
import { InsertablePerformance } from "../types/performance";
import { format } from "date-fns";

export const getAllPerformances = async () => {
  return performanceService.getAllPerformances();
};

export const getPerformancesByCWLID = async (id: number) => {
  return await performanceService.getPerformancesByCWLID(id);
};

const getIDByTag = async (tag: string) => {
  const account = await accountController.getAccountByTag(tag);
  return account.ID;
};

export const createPerformances = async (cwl: InsertableCWL) => {
  await cwlController.checkCWLExists(cwl.ID);

  const performances = await getPerformancesByCWLID(cwl.ID);

  if (performances.length != 0) {
    throw ServiceError.validationFailed(
      `Performances for CWL with ID ${cwl.ID} already exist`
    );
  }
  const targetClanTag = (await clanController.getClanByID(cwl.clanID)).tag;
  const targetMonth = format(new Date(cwl.year, cwl.month - 1), "yyyy-MM");

  const data = await clashKingAPI.fetchCWLData(targetClanTag, targetMonth);

  const formattedPerformances = await formatPerformances(
    data,
    cwl.ID,
    targetClanTag
  );

  await performanceService.createPerformances(formattedPerformances);

  return getPerformancesByCWLID(cwl.ID);
};

// Utility functions

const formatPerformances = async (
  data: CWLData,
  cwlID: number,
  targetClanTag: string
) => {
  const wars = data.rounds.flatMap((round) =>
    round.warTags.filter(
      (war) =>
        war.clan.tag === targetClanTag || war.opponent.tag === targetClanTag
    )
  );

  const memberDataMap: Record<string, InsertablePerformance> = {};

  for (const war of wars) {
    const isClan = war.clan.tag === targetClanTag;
    const myClan = isClan ? war.clan : war.opponent;

    for (const member of myClan.members) {
      try {
        if (!memberDataMap[member.tag]) {
          const ID = await getIDByTag(member.tag);

          memberDataMap[member.tag] = {
            accountID: ID,
            attacks: 0,
            stars: 0,
            damage: 0,
            missed: false,
            cwlID: cwlID,
          };
        }

        const memberData = memberDataMap[member.tag];

        if (member.attacks) {
          for (const attack of member.attacks) {
            memberData.attacks += 1;
            memberData.stars += attack.stars;
            memberData.damage += attack.destructionPercentage;
          }
        } else {
          memberData.attacks += 1;
          memberData.missed = true;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  return Object.values(memberDataMap);
};
