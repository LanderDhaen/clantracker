import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { MonthValue } from "../data/enums/months";
import { PlacementTypeValue } from "../data/enums/placementTypes";
import { LeagueValue } from "../data/enums/leagues";

export interface CWLTable {
  ID: Generated<number>;
  createdAt: ColumnType<Date>;
  updatedAt: ColumnType<Date>;
  isActive: ColumnType<boolean>;
  month: ColumnType<MonthValue>;
  year: ColumnType<number>;
  league: ColumnType<LeagueValue>;
  placement: ColumnType<number>;
  placementType: ColumnType<PlacementTypeValue>;
  stars: ColumnType<number>;
  damage: ColumnType<number>;
  size: ColumnType<number>;
  clanID: ColumnType<number>;
}

export type CWL = Selectable<CWLTable>;
export type InsertableCWL = Insertable<CWLTable>;
export type UpdateableCWL = Updateable<CWLTable>;

export type CWLData = {
  state: string;
  season: string;
  rounds: {
    warTags: WarTag[];
  }[];
  clan_rankings: {
    name: string;
    tag: string;
    stars: number;
    destruction: number;
    rounds: {
      won: number;
      tied: number;
      lost: number;
    };
  }[];
};

export type WarTag = {
  state: string;
  teamSize: number;
  preparationStartTime: string;
  startTime: string;
  endTime: string;
  clan: CWLClan;
  opponent: CWLClan;
  warStartTime: string;
  tag: string;
  season: string;
};

type CWLClan = {
  tag: string;
  name: string;
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
  members: Member[];
};

type Member = {
  tag: string;
  name: string;
  townhallLevel: number;
  mapPosition: number;
  attacks: Attack[];
  opponentAttacks: number;
  bestOpponentAttack: Attack;
};

type Attack = {
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  order: number;
  duration: number;
};
