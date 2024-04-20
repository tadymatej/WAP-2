import { Baby, GraduationCap } from "lucide-react";

export enum SearchingType {
  MaterskeZakladni,
  StredniVysoke,
}

//SearchingType to description
export const SearchingTypeDescription = {
  [SearchingType.MaterskeZakladni]: "Mateřské a základní školy",
  [SearchingType.StredniVysoke]: "Střední a vysoké školy",
};

//Searching type icon
export const SearchingTypeIcon = {
  [SearchingType.MaterskeZakladni]: Baby,
  [SearchingType.StredniVysoke]: GraduationCap,
};

//SearchingType values
export const SearchingTypeValues: SearchingType[] = Object.values(
  SearchingType
).filter((value) => typeof value === "number") as SearchingType[];

export enum SkolneTypes {
  Zdarma,
  to19k,
  to21k,
  to25k,
  to32k,
  moreThan32k,
}

//Skolne to description
export const SkolneTypesDescription = {
  [SkolneTypes.Zdarma]: "Zdarma",
  [SkolneTypes.to19k]: "Do 19 000 Kč",
  [SkolneTypes.to21k]: "Do 21 000 Kč",
  [SkolneTypes.to25k]: "Do 25 000 Kč",
  [SkolneTypes.to32k]: "Do 32 000 Kč",
  [SkolneTypes.moreThan32k]: "Více než 32 000 Kč",
};

//get all values of SkolneTypes
export const SkolneTypesValues: SkolneTypes[] = Object.values(
  SkolneTypes
).filter((value) => typeof value === "number") as SkolneTypes[];

export enum HodnoceniTypes {
  Hodnoceni0,
  Hodnoceni0_5,
  Hodnoceni1,
  Hodnoceni1_5,
  Hodnoceni2,
  Hodnoceni2_5,
  Hodnoceni3,
  Hodnoceni3_5,
  Hodnoceni4,
  Hodnoceni4_5,
  Hodnoceni5,
}

//get all values of HodnoceniTypes
export const HodnoceniTypesValues: HodnoceniTypes[] = Object.values(
  HodnoceniTypes
).filter((value) => typeof value === "number") as HodnoceniTypes[];
//Hodnoceni to description
export const HodnoceniTypesDescription = {
  [HodnoceniTypes.Hodnoceni0]: "0 hvězdiček",
  [HodnoceniTypes.Hodnoceni0_5]: "půl hvězdičky",
  [HodnoceniTypes.Hodnoceni1]: "1 hvězdička",
  [HodnoceniTypes.Hodnoceni1_5]: "1 a půl hvězdičky",
  [HodnoceniTypes.Hodnoceni2]: "2 hvězdičky",
  [HodnoceniTypes.Hodnoceni2_5]: "2 a půl hvězdičky",
  [HodnoceniTypes.Hodnoceni3]: "3 hvězdičky",
  [HodnoceniTypes.Hodnoceni3_5]: "3 a půl hvězdičky",
  [HodnoceniTypes.Hodnoceni4]: "4 hvězdičky",
  [HodnoceniTypes.Hodnoceni4_5]: "4 a půl hvězdičky",
  [HodnoceniTypes.Hodnoceni5]: "5 hvězdiček",
};

export enum FilterMultiSelectWrapperType {
  //Basic options, only one is active at a time
  //kraj table, take nazev
  Kraj,
  //obec table, take nazev
  Mesto,
  //okres table,   take nazev
  Okres,
  //mestska_cast table, take nazev
  MestskaCast,

  //Advanced options, where all are active at the same time
  // Obor table, filter by kod, but take name
  VyucovaneObory,
  //typ_skoly db enum
  TypSkoly,
  PrijmaciZkousky,
  //SkolneTypes enum
  Skolne,
  //HodnoceniTypes enum
  Hodnoceni,
}
