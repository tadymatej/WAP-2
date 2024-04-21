
/**
 * Type defining all possible sorting options for skola entities
 */
export enum SkolaOrderByEnum {
  Location = 1,
  Nazev = 2,
  Hodnoceni = 3,
}

/**
 * Type defining properties needed for filtering of skola entities
 * @property lat - latitude of actual location for filter by distance
 * @property lon - longitude of actual location for filter by distance
 */
export type SkolaOrderByModel = {
  lat?: number;
  lon?: number;
  type: SkolaOrderByEnum;
};
