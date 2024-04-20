

export interface HodnoceniModel {
  ID? : number;
  popis? : string | null;
  hvezdicek: number;
  jinaRoleUzivatele?: string | null;
  skolaID?: number | null;
  skolkaZakladkaID?: number | null;
  autor?: string | null;
  typRoleUzivatele?: TypRoleUzivateleModel;
}