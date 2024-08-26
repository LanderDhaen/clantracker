import { AccountTable } from "./account";
import { TownhallTable } from "./townhall";
import { ClanTable } from "./clan";
import { CWLTable } from "./cwl";
import { CWLDayTable } from "./cwlday";
import { PerformanceTable } from "./performance";
import { UserTable } from "./user";
import { SessionTable } from "./session";

export interface Database {
  townhall: TownhallTable;
  clan: ClanTable;
  account: AccountTable;
  cwl: CWLTable;
  cwlday: CWLDayTable;
  performance: PerformanceTable;
  user: UserTable;
  session: SessionTable;
}
