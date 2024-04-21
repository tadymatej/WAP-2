

/**
 * Base filter model for all entities
 * @property offset - skip offset results
 * @property limit - return only limit results
 */
export type BaseFilterModel = {
  offset?: number;
  limit?: number;
}