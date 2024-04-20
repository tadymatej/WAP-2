import { BaseFilterModel } from "./baseFilterModel";


export type PodskolaFilterModel = BaseFilterModel & {
  IDs : number[];
  skolaIDs: number[];
}