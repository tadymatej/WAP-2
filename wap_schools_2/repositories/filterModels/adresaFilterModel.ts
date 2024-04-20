import { BaseFilterModel } from "./baseFilterModel";


export type AdresaFilterModel = BaseFilterModel & {
  IDs: number[];
  skolaIDs: number[];
  skolkaZakladkaIDs : number[];
}