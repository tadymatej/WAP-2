import { BaseFilterModel } from './baseFilterModel';

/**
 * Filter model for hodnoceni entity
 * @property IDs - filter by hodnoceni.ID
 * @property skolaIDs - filter by hodnoceni.SkolaID
 * @property skolkaZakladkaIDs - filter by hodnoceni.SkolkaZakladkaID
 */
export type HodnoceniFilterModel = BaseFilterModel & {
  ID? : number;
  skolaIDs: number[];
  skolkaZakladkaIDs: number[];
}