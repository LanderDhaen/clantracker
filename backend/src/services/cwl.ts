import { db } from "../data/index";
import { sql } from "kysely";

export const getAllCWLs = async () => {
  const cwls = await db
    .selectFrom("cwl")
    .innerJoin("clan", "cwl.clanID", "clan.ID")
    .select([
      "cwl.ID",
      "cwl.month",
      "cwl.year",
      "cwl.league",
      "cwl.placement",
      "cwl.placementType",
      "clan.ID as clanID",
      "clan.name as clanName",
    ])
    .orderBy("cwl.year desc")
    .orderBy("cwl.month desc")
    .orderBy("clan.ID")
    .execute();

  return cwls;
};
