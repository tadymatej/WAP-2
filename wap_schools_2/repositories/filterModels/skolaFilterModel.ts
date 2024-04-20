import { BaseFilterModel } from "./baseFilterModel";
import { FilterItemRange } from "./filterItems/filterItemRange";

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
  oborIDs: number[];
  
}