

import { BaseFilterModel } from "./baseFilterModel";

/**
 * Filter model for obor_skolky_zakladky entity
 * @property IDs - filter by obor_skolky_zakladky.ID
 * @property skolkaZakladkaIDs - filter by obor_skolky_zakladky.SkolkaZakladkaID
 */
export type OborSkolkyZakladkyFilterModel = BaseFilterModel & {
  IDs : number[];
  skolkaZakladkaIDs: number[];
}