import { BaseFilterModel } from "./baseFilterModel";


/**
 * Filter model for podskola entity
 * @property IDs - filter by podskola.ID
 * @property skolkaZakladkaIDs - filter by podskola.SkolaID
 */
export type PodskolaFilterModel = BaseFilterModel & {
  IDs : number[];
  skolaIDs: number[];
}