import { BaseFilterModel } from "./baseFilterModel";
import { FilterItemRange } from "./filterItems/filterItemRange";

/**
 * Filter model for skola entity
 * @property IDs - filter by skola.ID
 * @property krajIDs - filter by skola -> adresa.krajID
 * @property okresIDs - filter by skola -> adresa.okresID
 * @property obecIDs - filter by skola -> adresa.obecID
 * @property castObceIDs - filter by skola -> adresa.castObceID
 * @property mestskaCastIDs - filter by skola -> adresa.mestskaCastID
 * @property typSkolyIDs - filter by skola -> skola.typSkolyID
 * @property skolneRange - filter by ranges in skola -> podskola -> obor.skolne
 * @property hodnoceniRange - filter by range in skola -> hodnoceni.hvezdicek
 * @property vzdalenostMax - filter by max distance from actual location == [lat, lon]
 * @property prijimaciZkouskaID - filter by skola -> podskola -> obor -> obor_prijimacizkouska.PrijimaciZkouskaID
 * @property druhSkolyIDs - filter by skola -> podskola.druhPodSkoly.ID
 * @property oborKods - filter by skola -> podskola -> obor.Kod
 * @property nazev - filter by skola.Nazev (LIKE statement)
 * @property lat - actual lat coordinate for vzdalenostMax filter
 * @property lon - actual lon coordinate for vzdalenostMax filter
 */
export type SkolaFilterModel = BaseFilterModel & {
  IDs: number[];
  krajIDs: number[];
  okresIDs: number[];
  obecIDs: number[];
  castObceIDs: number[];
  mestskaCastIDs: number[];
  typSkolyIDs: number[];
  skolneRange: FilterItemRange[];
  hodnoceniRange?: FilterItemRange;
  vzdalenostMax?: number;
  prijimaciZkouskaIDs: number[];
  druhSkolyIDs: number[];
  oborKods: string[];
  nazev?: string;

  lat?: number;
  lon?:number;
}