import { BaseFilterModel } from "./baseFilterModel";


export type OborFilterModel = BaseFilterModel & {
  IDs: number[];
  podskolaIDs: number[];
}