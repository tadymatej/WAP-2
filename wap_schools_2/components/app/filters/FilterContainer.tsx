
import { Button } from "@/components/ui/button";
import { FavouritesCard } from "../favourites/FavouritesCard";
import { FilterCard } from "../filters/FIlterCard";
import { useStore } from "@/state/useStore";
import React from "react";

export function FilterContainer() {
  const showFilter = useStore((state) => state.filter.showFilter);
  const showFilters = useStore((state) => state.responsive.showFilters);
  return (
    <React.Fragment>
      {showFilters &&
        <div
          className={
            showFilter
              ? "basis-1/4 flex-grow mr-4 transition-all duration-500 ease-in-out"
              : "w-0 h-full overflow-hidden transition-all duration-500 ease-in-out"
          }
        >
          <FilterCard />
          <div className="h-4" />
          <FavouritesCard />
        </div>
      }
    </React.Fragment>
    )
}