import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
import { SkolaZakladniMaterskaType } from "@/actions/types/skolaZakladniMaterskaType";
import { HodnoceniTypes, SearchingType } from "@/enums/filter-types";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { SkolkaZakladkaOrderByEnum } from "@/repositories/orderByTypes/skolkaZakladkaOrderByTypes";
import {
  FilterStateDefinition,
  FilterStateType,
  MD,
  XXL,
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
  sortBy: SkolaOrderByEnum.Nazev,
  sortSkolkaZakladkaBy: SkolkaZakladkaOrderByEnum.Nazev,
  favourites: [],
  druhPodskolySelected: [],
  skolaDruhTypeSelected: [],
  vysokeStredniSelected: undefined,
  zakladniMaterskaSelected: undefined,
  //set searching
  searchingType: SearchingType.MaterskeZakladni,
  longitude: undefined,
  latitude: undefined,

  showFilter: false,
  windowWidth: 0,
  showFavouritesDrawer: false,
  showFilterDrawer: false,
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

  //setFavourite
  setFavourite(favourite) {
    set((state) => {
      console.log("Setting favourite");
      console.log({
        fav: favourite,
      });
      state.filter.favourites = favourite;
    });
  },

  //setVysokeStredniSelected
  setVysokeStredniSelected(skola) {
    set((state) => {
      state.filter.vysokeStredniSelected = skola;
      if (state.filter.windowWidth < XXL) {
        state.filter.showFilter = false;
        state.filter.showFilterDrawer = false;
      }
    });
  },

  //setMaterskaZakladniSelected
  setMaterskaZakladniSelected(skola) {
    set((state) => {
      state.filter.zakladniMaterskaSelected = skola;

      if (state.filter.windowWidth < XXL) {
        state.filter.showFilter = false;
        state.filter.showFilterDrawer = false;
      }
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

  moveFavToTop(index) {
    set((state) => {
      const favs = state.filter.favourites;
      const fav = favs[index];
      favs.splice(index, 1);
      favs.unshift(fav);
    });
  },
  moveFavToBottom(index) {
    set((state) => {
      const favs = state.filter.favourites;
      const fav = favs[index];
      favs.splice(index, 1);
      favs.push(fav);
    });
  },

  setShowFilter(showFilter) {
    set((state) => {
      if (state.filter.windowWidth > XXL) {
        state.filter.showFilter = showFilter;
        return;
      }
      if (state.filter.windowWidth > MD) {
        state.filter.showFilter = showFilter;
        if (showFilter) {
          if (
            state.filter.zakladniMaterskaSelected !== undefined ||
            state.filter.vysokeStredniSelected !== undefined
          ) {
            state.filter.zakladniMaterskaSelected = undefined;
            state.filter.vysokeStredniSelected = undefined;
          }
        }
      }
      if (state.filter.windowWidth <= MD) {
        console.log("Setting show filter drawer");
        state.filter.showFilterDrawer = true;
      }
    });
  },

  setWindowWidth(width) {
    set((state) => {
      state.filter.windowWidth = width;
    });
  },

  setShowFavoritesDrawer(show) {
    set((state) => {
      state.filter.showFavouritesDrawer = show;
    });
  },
  setShowFilterDrawer(show) {
    set((state) => {
      state.filter.showFilterDrawer = show;
    });
  },
});
