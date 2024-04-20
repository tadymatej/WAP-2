import { StateCreator } from "zustand";

export interface OptionState {
  id: number;
  nazev: string;
}

export enum SkolySortType {
  Distance,
  Hodnoceni,
  Nazev,
  Skolne,
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
  [SkolySortType.Skolne]: "Školné",
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
  vyucovaneOborySelected: OptionState[];
  typySkolSelected: OptionState[];
  okresySelected: OptionState[];
  hodnoceniSelected: OptionState[];
  prijmaciZkouskySelected: OptionState[];
  skolneSelected: OptionState[];
  currentLocation: { x: number; y: number } | undefined;
  //viewing the school list
  sortBy: SkolySortType;
  offset: number;

  favoutiteSchools: OptionState[];
}

export interface FilterStateActions {
  setKraje: (kraje: OptionState[]) => void;
  setMesta: (mesta: OptionState[]) => void;
  setVyucovaneObory: (vyucovaneObory: OptionState[]) => void;
  setTypySkol: (typySkol: OptionState[]) => void;
  setOkresy: (okresy: OptionState[]) => void;
  setMestskeCasti: (mestskeCasti: OptionState[]) => void;
  setHodnoceni: (hodnoceni: OptionState[]) => void;
  setPrijmaciZkousky: (prijmaciZkousky: OptionState[]) => void;
  setSkolne: (skolne: OptionState[]) => void;
  setCurrentLocation: (location: { x: number; y: number }) => void;
  setSortBy: (sortBy: SkolySortType) => void;
  setOffset: (offset: number) => void;
  setFavouriteSchools: (favouriteSchools: OptionState[]) => void;
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
