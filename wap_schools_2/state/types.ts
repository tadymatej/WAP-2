import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniAllData";
import { SkolaZakladniMaterskaType } from "@/actions/types/skolkaZakladkaAllData";
import { HodnoceniTypes, SearchingType } from "@/enums/filter-types";
import { StateCreator } from "zustand";

export interface OptionState {
  id: number;
  nazev: string;
}

export enum SkolySortType {
  Distance,
  Hodnoceni,
  Nazev,
  //Skolne,
}

//give me all values of SkolySortType
export const SkolySortTypeValues: SkolySortType[] = Object.values(
  SkolySortType
).filter((value) => typeof value === "number") as SkolySortType[];

//SkolySortType to description
export const SkolySortTypeDescription = {
  [SkolySortType.Distance]: "Vzdálenost",
  [SkolySortType.Hodnoceni]: "Hodnocení",
  [SkolySortType.Nazev]: "Název",
  //[SkolySortType.Skolne]: "Školné",
};

//revers to SkolySortTypeDescription. I.e. "Vzdálenost" -> SkolySortType.Distance
export const SkolySortTypeReverseDescription: Record<string, SkolySortType> =
  Object.fromEntries(
    Object.entries(SkolySortTypeDescription).map(([k, v]) => [
      v,
      SkolySortType[k as keyof typeof SkolySortType],
    ])
  );

export interface FilterStateDefinition {
  krajeSelected: OptionState[];
  mestaSelected: OptionState[];
  mestskeCastiSelected: OptionState[];
  okresySelected: OptionState[];

  vyucovaneOborySelected: OptionState[];

  // When filtering for stredni a vysoke skoly
  druhPodskolySelected: OptionState[];
  //for filtering materska, zakladni a zakladni umnelecka skola
  skolaDruhTypeSelected: OptionState[];
  //Statni, soukroma, verejna....
  typySkolSelected: OptionState[];
  //custom values
  hodnoceniSelected: HodnoceniTypes;
  prijmaciZkouskySelected: OptionState[];
  //custom values
  skolneSelected: OptionState[];

  //It can be not used, custom values
  longitude: number | undefined;
  latitude: number | undefined;

  currentLocation: { x: number; y: number } | undefined;
  //viewing the school list
  sortBy: SkolySortType;
  offset: number;

  favourites: Array<SkolaVysokaStredniType | SkolaZakladniMaterskaType>;

  //Selected
  vysokeStredniSelected: SkolaVysokaStredniType | undefined;
  zakladniMaterskaSelected: SkolaZakladniMaterskaType | undefined;
  //
  searchingType: SearchingType;
}

export interface FilterStateActions {
  setKraje: (kraje: OptionState[]) => void;
  setMesta: (mesta: OptionState[]) => void;
  setVyucovaneObory: (vyucovaneObory: OptionState[]) => void;
  setTypySkol: (typySkol: OptionState[]) => void;
  setOkresy: (okresy: OptionState[]) => void;
  setMestskeCasti: (mestskeCasti: OptionState[]) => void;
  setHodnoceni: (hodnoceni: HodnoceniTypes) => void;
  setPrijmaciZkousky: (prijmaciZkousky: OptionState[]) => void;
  setSkolne: (skolne: OptionState[]) => void;
  setCurrentLocation: (location: { x: number; y: number }) => void;
  setSortBy: (sortBy: SkolySortType) => void;
  setOffset: (offset: number) => void;
  //setFavouriteSchools: (favouriteSchools: OptionState[]) => void;
  setFavourite: (
    favouriteSchools: Array<SkolaVysokaStredniType | SkolaZakladniMaterskaType>
  ) => void;

  setMaterskaZakladniSelected: (
    skola: SkolaZakladniMaterskaType | undefined
  ) => void;
  setVysokeStredniSelected: (skola: SkolaVysokaStredniType | undefined) => void;
  //Getters for getting values for filtering
  //getKraje: () => number[];
  //getMesta: () => number[];
  //getVyucovaneObory: () => number[];
  //getTypySkol: () => number[];
  setSearchingType: (searchingType: SearchingType) => void;
  getFavouritesMaterskeSkoly: () => SkolaZakladniMaterskaType[];
  getFavouritesVysokeStredniSkoly: () => SkolaVysokaStredniType[];

  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;

  setToDefault: () => void;
}

export type FilterStateType = FilterStateDefinition & FilterStateActions;

export interface CombinedState {
  filter: FilterStateType;
}

export type StateSlice<T> = StateCreator<
  CombinedState,
  [["zustand/immer", never]],
  [["zustand/immer", Partial<T>]],
  T
>;
