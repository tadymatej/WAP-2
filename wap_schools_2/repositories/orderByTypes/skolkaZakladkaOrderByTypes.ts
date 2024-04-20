


export enum SkolkaZakladkaOrderByEnum {
  Location = 1,
  Nazev = 2,
  Hodnoceni = 3
}

export type SkolkaZakladkaOrderByModel = {
  lat?: number;
  lon?: number;
  type: SkolkaZakladkaOrderByEnum;
}