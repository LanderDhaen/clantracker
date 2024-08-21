import { AccountTable } from "./account";
import { TownhallTable } from "./townhall";
import { ClanTable } from "./clan";
import { CWLTable } from "./cwl";
import { PerformanceTable } from "./performance";

export interface Database {
  townhall: TownhallTable;
  clan: ClanTable;
  account: AccountTable;
  cwl: CWLTable;
  performance: PerformanceTable;
}
