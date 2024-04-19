import { StateCreator } from "zustand";

export interface OptionState {
	id: number;
	nazev: string;
}

export interface FilterStateDefinition {
	krajeSelected: OptionState[];
	mestaSelected: OptionState[];
	mestskeCastiSelected: OptionState[];
	vyucovaneOborySelected: OptionState[];
	typySkolSelected: OptionState[];
	okresySelected: OptionState[];
}

export interface FilterStateActions {
	setKraje: (kraje: OptionState[]) => void;
	setMesta: (mesta: OptionState[]) => void;
	setVyucovaneObory: (vyucovaneObory: OptionState[]) => void;
	setTypySkol: (typySkol: OptionState[]) => void;
	setOkresy: (okresy: OptionState[]) => void;
	setMestskeCasti: (mestskeCasti: OptionState[]) => void;
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
