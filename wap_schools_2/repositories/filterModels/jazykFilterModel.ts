
import { BaseFilterModel } from "./baseFilterModel";

/**
 * Filter model for jazyk entity
 * @property skolaIDs - filter by jazyk -> skola.ID
 */
export type JazykFilterModel = BaseFilterModel & {
  skolaID?: number;
}