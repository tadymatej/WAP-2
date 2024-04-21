import { BaseFilterModel } from "./baseFilterModel";

/**
 * Filter model for obor entity
 * @property IDs - filter by obor.ID
 * @property skolaIDs - filter by obor.podskolaID 
 */
export type OborFilterModel = BaseFilterModel & {
  IDs: number[];
  podskolaIDs: number[];
}