import { StateSlice } from "./types";

interface ResponsiveState {
  showHeader: boolean;
  showFilters: boolean;
  showDetail: boolean;
  showList: boolean;
}

interface ResponsiveStateActions {
  setShowHeader: (val : boolean) => void;
  getShowHeader: () => boolean;
  setShowFilters: (val : boolean) => void;
  getShowFilters: () => boolean;
  setShowDetail: (val : boolean) => void;
  getShowDetail: () => boolean;
  setShowList: (val : boolean) => void;
  getShowList: () => boolean;

}

export const LARGE = 1024;
export const EXTRA_SMALL = 420;

const initialResponsiveState : ResponsiveState = {
  showHeader: true,
  showFilters: true,
  showList: false,
  showDetail: false,
}

export type ResponsiveStateType = ResponsiveState & ResponsiveStateActions;

export const createResponsiveState: StateSlice<ResponsiveStateType> = (set, get) => ({
  ...initialResponsiveState,
  setShowHeader(val) {
    set((state) => {
      state.responsive.showHeader = val
    })
  },
  setShowList(val) {
    set((state) => {
      state.responsive.showList = val
    })
  },
  setShowDetail(val) {
    set((state) => {
      state.responsive.showDetail = val
    })
  },
  setShowFilters(val) {
    set((state) => {
      state.responsive.showFilters = val
    })
  },
  getShowHeader() {
    return get().responsive.showHeader   
  },
  getShowFilters() {
    return get().responsive.showFilters;   
  },
  getShowList() {
    return get().responsive.showList;   
  },
  getShowDetail() {
    return get().responsive.showDetail   
  },
})