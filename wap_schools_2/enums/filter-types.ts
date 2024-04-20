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

//get all values of SkolneTypes
export const SkolneTypesValues: SkolneTypes[] = Object.values(
  SkolneTypes
).filter((value) => typeof value === "number") as SkolneTypes[];

export const SkolneTypesData = {
  [SkolneTypes.Zdarma]: {
    desc: "Zdarma",
    range: {
      start: 0,
      end: 0,
    },
  },
  [SkolneTypes.to19k]: {
    desc: "Od 0 do 19 000 Kč",
    range: {
      start: 0,
      end: 19000,
    },
  },
  [SkolneTypes.to21k]: {
    desc: "Od 19 000 do 21 000 Kč",
    range: {
      start: 0,
      end: 21000,
    },
  },
  [SkolneTypes.to25k]: {
    desc: "Od 21 000 do 25 000 Kč",
    range: {
      start: 0,
      end: 25000,
    },
  },
  [SkolneTypes.to32k]: {
    desc: "Od 25 000 do 32 000 Kč",
    range: {
      start: 0,
      end: 32000,
    },
  },
  [SkolneTypes.moreThan32k]: {
    desc: "Více než 32 000 Kč",
    range: {
      start: 32000,
      end: undefined,
    },
  },
};

export enum HodnoceniTypes {
  zadneOmezeni,
  nejmene3hvezdicky,
  nejmene4hvezdicky,
  nejmene5hvezdicky,
}

export const HodnoceniTypesData = {
  [HodnoceniTypes.zadneOmezeni]: {
    desc: "Žádné omezení",
    range: {
      start: undefined,
      end: undefined,
    },
  },

  [HodnoceniTypes.nejmene3hvezdicky]: {
    desc: "Nejméně 3 hvězdičky",
    range: {
      start: 3,
      end: 5,
    },
  },
  [HodnoceniTypes.nejmene4hvezdicky]: {
    desc: "Nejméně 4 hvězdičky",
    range: {
      start: 4,
      end: 5,
    },
  },
  [HodnoceniTypes.nejmene5hvezdicky]: {
    desc: "5 hvězdiček",
    range: {
      start: 5,
      end: 5,
    },
  },
};

//get all values of HodnoceniTypes
export const HodnoceniTypesValues: HodnoceniTypes[] = Object.values(
  HodnoceniTypes
).filter((value) => typeof value === "number") as HodnoceniTypes[];

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
}
