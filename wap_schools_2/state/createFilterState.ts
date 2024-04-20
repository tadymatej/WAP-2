import {
  FilterStateDefinition,
  FilterStateType,
  SkolySortType,
  type StateSlice,
} from "./types";
const initialFilterState: FilterStateDefinition = {
  krajeSelected: [],
  mestaSelected: [],
  mestskeCastiSelected: [],
  vyucovaneOborySelected: [],
  typySkolSelected: [],
  okresySelected: [],
  hodnoceniSelected: [],
  prijmaciZkouskySelected: [],
  skolneSelected: [],
  currentLocation: undefined,
  sortBy: SkolySortType.Distance,
  offset: 0,
  favoutiteSchools: [],
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
  //setHodnoceni
  setHodnoceni(hodnoceni) {
    set((state) => {
      state.filter.hodnoceniSelected = hodnoceni;
    });
  },
  //setPrijmaciZkousky
  setPrijmaciZkousky(prijmaciZkousky) {
    set((state) => {
      state.filter.prijmaciZkouskySelected = prijmaciZkousky;
    });
  },
  //setSkolne
  setSkolne(skolne) {
    set((state) => {
      state.filter.skolneSelected = skolne;
    });
  },
  //setCurrentLocation
  setCurrentLocation(location) {
    set((state) => {
      state.filter.currentLocation = location;
    });
  },
  //setSortBy
  setSortBy(sortBy) {
    set((state) => {
      state.filter.sortBy = sortBy;
    });
  },
  //setOffset
  setOffset(offset) {
    set((state) => {
      state.filter.offset = offset;
    });
  },
  //setFavouriteSchools
  setFavouriteSchools(favouriteSchools) {
    set((state) => {
      state.filter.favoutiteSchools = favouriteSchools;
    });
  },
});
