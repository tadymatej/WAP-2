import { BaseFilterModel } from "./baseFilterModel";


/**
 * Filter model for adresa entity
 * @property IDs - filter by adresa.ID
 * @property skolaIDs - filter by adresa -> skola.skolaID
 * @property skolkaZakladkaIDs - filter by skolka_zakladka -> skolkazakladka_adresa.SkolkaZakladkaID
 */
export type AdresaFilterModel = BaseFilterModel & {
  IDs: number[];
  skolaIDs: number[];
  skolkaZakladkaIDs : number[];
}