import ServiceError from "../middleware/serviceError";
import * as cwlService from "../services/cwl";
import * as cwlDayController from "./cwlday";
import * as clanController from "./clan";
import * as clashKingAPI from "../api/clashking";
import { CWLClan, CWLData, InsertableCWL, WarTag } from "../types/cwl";
import { format } from "date-fns";
import { MonthValue } from "../data/enums/months";

export const getAllCWLs = async () => {
  return cwlService.getAllCWLs();
};

export const getCWLByID = async (id: number) => {
  await checkCWlExists(id);

  return cwlService.getCWLByID(id);
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

export const getCWLByMonthYearClan = async (
  month: MonthValue,
  year: number,
  clanID: number
) => {
  const cwl = await cwlService.getCWLByMonthYearClan(month, year, clanID);

  if (cwl) {
    throw ServiceError.validationFailed(
      `CWL for month ${month} and year ${year} for clan ${clanID} already exists`
    );
  }
};

export const createCWL = async (cwl: InsertableCWL) => {
  await getCWLByMonthYearClan(cwl.month, cwl.year, cwl.clanID);

  const targetClanTag = (await clanController.getClanByID(cwl.clanID)).tag;
  const targetMonth = format(new Date(cwl.year, cwl.month - 1), "yyyy-MM");

  const data = await clashKingAPI.fetchCWLData(targetClanTag, targetMonth);

  // Finding the rank & data of the target clan

  const rank =
    data.clan_rankings.findIndex((clan) => clan.tag === targetClanTag) + 1;
  const rankData = data.clan_rankings.find(
    (rank) => rank.tag === targetClanTag
  );

  // Creating the CWL object

  const newCWL = await cwlService.createCWL({
    month: cwl.month,
    year: cwl.year,
    league: cwl.league,
    placement: rank,
    placementType: cwl.placementType,
    stars: rankData.stars,
    damage: rankData.destruction,
    size: cwl.size,
    clanID: cwl.clanID,
  });

  const cwlDays = await formatCWLDays(newCWL.ID, data, targetClanTag);

  await cwlDayController.createCWLDays(cwlDays);

  return getCWLByID(newCWL.ID);
};

const formatCWLDays = async (
  cwlID: number,
  data: CWLData,
  targetClanTag: string
) => {
  const wars = data.rounds.flatMap((round) =>
    round.warTags.filter(
      (war) =>
        war.clan.tag === targetClanTag || war.opponent.tag === targetClanTag
    )
  );

  const cwlDays = wars.map((war, index) => {
    const day = index + 1;

    const isClan = war.clan.tag === targetClanTag;
    const clan = isClan ? war.clan : war.opponent;
    const opponent = isClan ? war.opponent : war.clan;

    return {
      cwlID: cwlID,
      stars: clan.stars,
      damage: parseFloat(clan.destructionPercentage.toFixed(1)),
      attacks: clan.attacks,
      starsAgainst: opponent.stars,
      damageAgainst: parseFloat(opponent.destructionPercentage.toFixed(1)),
      attacksAgainst: opponent.attacks,
      win: calculateWinner(clan, opponent),
      day: day,
    };
  });

  return cwlDays;
};

const calculateWinner = (clan: CWLClan, opponent: CWLClan) => {
  if ((clan.stars = opponent.stars)) {
    return clan.destructionPercentage > opponent.destructionPercentage;
  } else {
    return clan.stars > opponent.stars;
  }
};
