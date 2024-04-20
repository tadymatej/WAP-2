import { BaseFilterModel } from './baseFilterModel';

export type HodnoceniFilterModel = BaseFilterModel & {
  ID? : number;
  skolaIDs: number[];
  skolkaZakladkaIDs: number[];
}