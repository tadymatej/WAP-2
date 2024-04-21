"use client";

import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/state/useStore";
import React, { useEffect, useState } from "react";
import { FavouritesCard } from "../favourites/FavouritesCard";
import { FilterCard } from "../filters/FIlterCard";
import SchoolsCard from "../school_list/SchoolsCard";
import { VysokaStredniVsMaterskaZakladniSelect } from "../VysokaStredniVsMaterskaZakladniSelect";

export function MainFrame() {
  const setShowFilter = useStore((state) => state.filter.setShowFilter);
  const showFilter = useStore((state) => state.filter.showFilter);

  //Check on init if screen is bigger than 1024px px set showFilter to true
  useEffect(() => {
      setShowFilter(true);
    console.log("Setting to default");
  }, [setShowFilter]);

  return (
    <React.Fragment>
      <main className="h-full flex flex-col">
        <div className="sticky top-0 z-10  p-8">
          <VysokaStredniVsMaterskaZakladniSelect />
        </div>
        <div className="flex flex-row">
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
          <div className="basis-3/4 flex-grow">
            <SchoolsCard />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
