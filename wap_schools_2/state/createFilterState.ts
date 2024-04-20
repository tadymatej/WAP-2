import { SkolaVysokaStredniType } from "@/actions/search-schools";
import { SkolaZakladniMaterskaType } from "@/actions/search-zaklani_schools";
import { SearchingType } from "@/enums/filter-types";
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
  favourites: [],
  druhPodskolySelected: [],
  skolaDruhTypeSelected: [],
  lokaceSelected: [],
  vysokeStredniSelected: undefined,
  zakladniMaterskaSelected: undefined,
  //set searching
  searchingType: SearchingType.MaterskeZakladni,
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

  //setFavourite
  setFavourite(favourite) {
    set((state) => {
      state.filter.favourites = favourite;
    });
  },

  //setVysokeStredniSelected
  setVysokeStredniSelected(skola) {
    set((state) => {
      state.filter.vysokeStredniSelected = skola;
      state.filter.zakladniMaterskaSelected = undefined;
    });
  },

  //setMaterskaZakladniSelected
  setMaterskaZakladniSelected(skola) {
    set((state) => {
      state.filter.zakladniMaterskaSelected = skola;
      state.filter.vysokeStredniSelected = undefined;
    });
  },
  //setSearchingType
  setSearchingType(searchingType) {
    set((state) => {
      state.filter.searchingType = searchingType;
    });
  },

  getFavouritesMaterskeSkoly() {
    return get().filter.favourites.filter(
      (favourite) => !("rediteltel" in favourite)
    ) as SkolaZakladniMaterskaType[];
  },

  getFavouritesVysokeStredniSkoly() {
    return get().filter.favourites.filter(
      (favourite) => "rediteltel" in favourite
    ) as SkolaVysokaStredniType[];
  },
});
