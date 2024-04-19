import {
	FilterStateDefinition,
	FilterStateType,
	type StateSlice,
} from "./types";
const initialFilterState: FilterStateDefinition = {
	krajeSelected: [],
	mestaSelected: [],
	mestskeCastiSelected: [],
	vyucovaneOborySelected: [],
	typySkolSelected: [],
	okresySelected: [],
};

export const createFilterState: StateSlice<FilterStateType> = (set, get) => ({
	...initialFilterState,
	setKraje(kraje) {
		set((state) => {
			state.filter.krajeSelected = kraje;
		});
	},

	setMesta(mesta) {
		set((state) => {
			state.filter.mestaSelected = mesta;
		});
	},

	setVyucovaneObory(vyucovaneObory) {
		set((state) => {
			state.filter.vyucovaneOborySelected = vyucovaneObory;
		});
	},

	setTypySkol(typySkol) {
		set((state) => {
			state.filter.typySkolSelected = typySkol;
		});
	},

	setOkresy(okresy) {
		set((state) => {
			state.filter.okresySelected = okresy;
		});
	},

	//setMestskeCasti
	setMestskeCasti(mestskeCasti) {
		set((state) => {
			state.filter.mestskeCastiSelected = mestskeCasti;
		});
	},
});
