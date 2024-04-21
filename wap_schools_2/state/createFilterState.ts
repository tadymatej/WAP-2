import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
import { SkolaZakladniMaterskaType } from "@/actions/types/skolaZakladniMaterskaType";
import { HodnoceniTypes, SearchingType } from "@/enums/filter-types";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { SkolkaZakladkaOrderByEnum } from "@/repositories/orderByTypes/skolkaZakladkaOrderByTypes";
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
  hodnoceniSelected: HodnoceniTypes.zadneOmezeni,
  prijmaciZkouskySelected: [],
  skolneSelected: [],
  currentLocation: undefined,
  sortBy: SkolaOrderByEnum.Nazev,
  sortSkolkaZakladkaBy: SkolkaZakladkaOrderByEnum.Nazev,
  offset: 0,
  favourites: [],
  druhPodskolySelected: [],
  skolaDruhTypeSelected: [],
  vysokeStredniSelected: undefined,
  zakladniMaterskaSelected: undefined,
  //set searching
  searchingType: SearchingType.MaterskeZakladni,
  longitude: undefined,
  latitude: undefined,
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
  setSortSkolkaZakladkaBy(sortSkolkaZakladkaBy) {
    set((state) => {
      state.filter.sortSkolkaZakladkaBy = sortSkolkaZakladkaBy;
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
    });
  },

  //setMaterskaZakladniSelected
  setMaterskaZakladniSelected(skola) {
    set((state) => {
      state.filter.zakladniMaterskaSelected = skola;
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

  setLatitude(latitude) {
    set((state) => {
      state.filter.latitude = latitude;
    });
  },
  setLongitude(longitude) {
    set((state) => {
      state.filter.longitude = longitude;
    });
  },

  setToDefault() {
    set((state) => {
      console.log("Setting to default");
      state.filter.krajeSelected = [];
      state.filter.mestaSelected = [];
      state.filter.mestskeCastiSelected = [];
      state.filter.okresySelected = [];
    });
  },
});
