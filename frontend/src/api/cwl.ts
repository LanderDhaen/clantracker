import useSWR from "swr";
import { get } from "./index.js";
import { LeagueValue } from "@/lib/formatLeague.js";
import { PlacementTypeValue } from "@/lib/formatPlacementTypes.js";

export type CWL = {
  ID: number;
  month: number;
  year: number;
  league: LeagueValue;
  placement: number;
  placementType: PlacementTypeValue;
  clanID: number;
  clanName: string;
};

export type CWLDetail = {
  cwl: {
    ID: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    month: number;
    year: number;
    league: LeagueValue;
    placement: number;
    placementType: PlacementTypeValue;
    size: number;
  };
  clan: {
    ID: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    name: string;
    abbreviation: string;
    level: number;
    location: string;
    language: string;
    cwl: LeagueValue;
    longestWinStreak: number;
  };
  statistics: {
    stars: {
      username: string;
      townhall: number;
      bonus: boolean;
      stars: number;
      attacks: number;
      avgStars: number;
    }[];
    damage: {
      username: string;
      townhall: number;
      bonus: boolean;
      damage: number;
      attacks: number;
      avgDamage: number;
    }[];
  };
};

export function getCWLs() {
  return useSWR<CWL[]>("/cwls", get);
}

export function getCWLDetailsByID(id: string | undefined) {
  return useSWR<CWLDetail>(`/cwls/${id}`, get);
}
