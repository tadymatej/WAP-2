import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
import { SkolaZakladniMaterskaType } from "@/actions/types/skolaZakladniMaterskaType";
import { HodnoceniTypes, SearchingType } from "@/enums/filter-types";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { SkolkaZakladkaOrderByEnum } from "@/repositories/orderByTypes/skolkaZakladkaOrderByTypes";
import { StateCreator } from "zustand";
import { ResponsiveStateType } from "./createResponsiveState";

export interface OptionState {
  id: number;
  nazev: string;
  /// Used only for obory, where each obor has a number of ids
  kod?: string;
}

export const SkolaSortByMap = [
  {
    value: "Vzdálenost",
    type: SkolaOrderByEnum.Location,
  },
  {
    value: "Hodnocení",
    type: SkolaOrderByEnum.Hodnoceni,
  },
  {
    value: "Název",
    type: SkolaOrderByEnum.Nazev,
  },
];

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
  sortBy: SkolaOrderByEnum;
  sortSkolkaZakladkaBy: SkolkaZakladkaOrderByEnum;
  offset: number;

  favourites: Array<SkolaVysokaStredniType | SkolaZakladniMaterskaType>;

  //Selected
  vysokeStredniSelected: SkolaVysokaStredniType | undefined;
  zakladniMaterskaSelected: SkolaZakladniMaterskaType | undefined;
  //
  searchingType: SearchingType;
  //Responsivity
  showFilter: boolean;
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
  setSortBy: (sortBy: SkolaOrderByEnum) => void;
  setSortSkolkaZakladkaBy: (
    sortSkolkaZakladkaBy: SkolkaZakladkaOrderByEnum
  ) => void;
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

  //to top
  moveFavToTop: (index: number) => void;
  moveFavToBottom: (index: number) => void;

  //responsitivy
  setShowFilter: (showFilter: boolean) => void;
}

export type FilterStateType = FilterStateDefinition & FilterStateActions;

export interface CombinedState {
  filter: FilterStateType;
  responsive: ResponsiveStateType;
}

export type StateSlice<T> = StateCreator<
  CombinedState,
  [["zustand/immer", never]],
  [["zustand/immer", Partial<T>]],
  T
>;
