import { SkolySortType } from "@/state/types";

export enum SkolkaZakladkaOrderByEnum {
  Location = 1,
  Nazev = 2,
  Hodnoceni = 3,
}

export const SkolkaZakladkaOrderByFromSortBy = {
  [SkolySortType.Hodnoceni]: SkolkaZakladkaOrderByEnum.Hodnoceni,
  [SkolySortType.Distance]: SkolkaZakladkaOrderByEnum.Location,
  [SkolySortType.Nazev]: SkolkaZakladkaOrderByEnum.Nazev,
};

export type SkolkaZakladkaOrderByModel = {
  lat?: number;
  lon?: number;
  type: SkolkaZakladkaOrderByEnum;
};
