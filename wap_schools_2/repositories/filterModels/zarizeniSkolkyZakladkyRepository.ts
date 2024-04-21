

import { BaseFilterModel } from "./baseFilterModel";

/**
 * Filter model for zarizeni_skolky_zakladky entity
 * @property IDs - filter by zarizeni_skolky_zakladky.ID
 * @property skolkaZakladkaIDs - filter by zarizeni_skolky_zakladky.SkolkaZakladkaID
 */
export type ZarizeniSkolkyZakladkyFilterModel = BaseFilterModel & {
  IDs : number[];
  skolkaZakladkaIDs: number[];
}