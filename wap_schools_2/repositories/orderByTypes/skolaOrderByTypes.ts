import { SkolySortType } from "@/state/types";

export enum SkolaOrderByEnum {
  Location = 1,
  Nazev = 2,
  Hodnoceni = 3,
}

export const SkolaOrderByFromSortBy = {
  [SkolySortType.Hodnoceni]: SkolaOrderByEnum.Hodnoceni,
  [SkolySortType.Distance]: SkolaOrderByEnum.Location,
  [SkolySortType.Nazev]: SkolaOrderByEnum.Nazev,
};

export type SkolaOrderByModel = {
  lat?: number;
  lon?: number;
  type: SkolaOrderByEnum;
};
