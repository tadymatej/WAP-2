import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createFilterState } from "./createFilterState";
import { createSelectors } from "./createSelectors";
import type { CombinedState } from "./types";

const useStoreBase = create<CombinedState>()(
  immer((...api) => ({
    filter: createFilterState(...api),
  }))
);

export const useStore = createSelectors(useStoreBase);
