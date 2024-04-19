import { StateCreator } from "zustand";

export interface FilterStateDefinition {
  krajeSelected: string[];
  mestaSelected: string[];
  mestskeCastiSelected: string[];
  vyucovaneOborySelected: string[];
  typySkolSelected: string[];
  okresySelected: string[];
}

export interface FilterStateActions {
  clearKrajAll: () => void;
  setKraje: (kraje: string[]) => void;
  clearMestaAll: () => void;
  setMesta: (mesta: string[]) => void;
  clearVyucovaneOboryAll: () => void;
  setVyucovaneObory: (vyucovaneObory: string[]) => void;
  clearTypySkolAll: () => void;
  setTypySkol: (typySkol: string[]) => void;
  clearOkresyAll: () => void;
  setOkresy: (okresy: string[]) => void;
  setMestskeCasti: (mestskeCasti: string[]) => void;
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
