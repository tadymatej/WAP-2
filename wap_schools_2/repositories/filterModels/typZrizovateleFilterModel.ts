
import { BaseFilterModel } from "./baseFilterModel";

/**
 * Filter model for typ_zrizovatele entity
 * @property skolkaZakladkaIDs - filter by typ_zrizovatele -> skola.ID
 */
export type TypZrizovateleFilterModel = BaseFilterModel & {
  skolaID?: number;
}