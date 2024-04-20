import { BaseFilterModel } from "./baseFilterModel";
import { FilterItemRange } from "./filterItems/filterItemRange";

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