

import { BaseFilterModel } from "./baseFilterModel";


export type ZarizeniSkolkyZakladkyFilterModel = BaseFilterModel & {
  IDs : number[];
  skolkaZakladkaIDs: number[];
}