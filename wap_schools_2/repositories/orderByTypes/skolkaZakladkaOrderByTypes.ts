
/**
 * Type defining all possible sorting options for skolka_zakladka entities
 */
export enum SkolkaZakladkaOrderByEnum {
  Location = 1,
  Nazev = 2,
  Hodnoceni = 3,
}

/**
 * Type defining properties needed for filtering of skolka_zakladka entities
 * @property lat - latitude of actual location for filter by distance
 * @property lon - longitude of actual location for filter by distance
 */
export type SkolkaZakladkaOrderByModel = {
  lat?: number;
  lon?: number;
  type: SkolkaZakladkaOrderByEnum;
};
