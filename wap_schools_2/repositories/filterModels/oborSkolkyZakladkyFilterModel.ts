

import { BaseFilterModel } from "./baseFilterModel";


export type OborSkolkyZakladkyFilterModel = BaseFilterModel & {
  IDs : number[];
  skolkaZakladkaIDs: number[];
}