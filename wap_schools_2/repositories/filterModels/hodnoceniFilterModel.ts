import { BaseFilterModel } from './baseFilterModel';

export type HodnoceniFilterModel = BaseFilterModel & {
  ID : number;
  skolaID?: number;
  skolkaZakladkaID?: number;
}