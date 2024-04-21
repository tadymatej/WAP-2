import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createFilterState } from "./createFilterState";
import { createSelectors } from "./createSelectors";
import type { CombinedState } from "./types";
import { createResponsiveState } from "./createResponsiveState";

const useStoreBase = create<CombinedState>()(
  immer((...api) => ({
    filter: createFilterState(...api),
    responsive: createResponsiveState(...api)
  }))
);

export const useStore = createSelectors(useStoreBase);
