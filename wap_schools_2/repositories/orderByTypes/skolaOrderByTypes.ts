
export enum SkolaOrderByEnum {
  Location = 1,
  Nazev = 2,
  Hodnoceni = 3,
}

export type SkolaOrderByModel = {
  lat?: number;
  lon?: number;
  type: SkolaOrderByEnum;
};
