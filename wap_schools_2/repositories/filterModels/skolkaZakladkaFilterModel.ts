import { BaseFilterModel } from "./baseFilterModel";
import { FilterItemRange } from "./filterItems/filterItemRange";

/**
 * Filter model for skolka_zakladka entity
 * @property IDs - filter by skola.ID
 * @property krajIDs - filter by skolka_zakladka -> adresa.krajID
 * @property okresIDs - filter by skolka_zakladka -> adresa.okresID
 * @property obecIDs - filter by skolka_zakladka -> adresa.obecID
 * @property castObceIDs - filter by skolka_zakladka -> adresa.castObceID
 * @property mestskaCastIDs - filter by skolka_zakladka -> adresa.mestskaCastID
 * @property hodnoceniRange - filter by range in skolka_zakladka -> hodnoceni.hvezdicek
 * @property zarizeniIDs - filter by skolka_zakladka -> zarizeni_skolky_zakladky.ID
 * @property typZrizovateleIDs - filter by skolka_zakladka.typZrizovateleID
 * @property vzdalenostMax - filter by max distance from actual location == [lat, lon]
 * @property nazev - filter by skola.Nazev (LIKE statement)
 * @property lat - actual lat coordinate for vzdalenostMax filter
 * @property lon - actual lon coordinate for vzdalenostMax filter
 */
export type SkolkaZakladkaFilterModel = BaseFilterModel & {
  krajIDs: number[];
  okresIDs: number[];
  obecIDs: number[];
  castObceIDs: number[];
  mestskaCastIDs: number[];
  vzdalenostMax?: number;
  hodnoceniRange?: FilterItemRange;
  skolaDruhTypIDs: number[];
  zarizeniIDs: number[];  
  nazev?: string;
  typZrizovateleIDs: number[];
  IDs: number[];

  lat?: number;
  lon?:number;
}