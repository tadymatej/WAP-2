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
  clearKrajAll() {
    set((state) => {
      state.filter.krajeSelected = [];
    });
  },
  setMesta(mesta) {
    set((state) => {
      state.filter.mestaSelected = mesta;
    });
  },
  clearMestaAll() {
    set((state) => {
      state.filter.mestaSelected = [];
    });
  },
  setVyucovaneObory(vyucovaneObory) {
    set((state) => {
      state.filter.vyucovaneOborySelected = vyucovaneObory;
    });
  },
  clearVyucovaneOboryAll() {
    set((state) => {
      state.filter.vyucovaneOborySelected = [];
    });
  },
  setTypySkol(typySkol) {
    set((state) => {
      state.filter.typySkolSelected = typySkol;
    });
  },
  clearTypySkolAll() {
    set((state) => {
      state.filter.typySkolSelected = [];
    });
  },
  setOkresy(okresy) {
    set((state) => {
      state.filter.okresySelected = okresy;
    });
  },
  clearOkresyAll() {
    set((state) => {
      state.filter.okresySelected = [];
    });
  },
  //setMestskeCasti
  setMestskeCasti(mestskeCasti) {
    set((state) => {
      state.filter.mestskeCastiSelected = mestskeCasti;
    });
  },
});
