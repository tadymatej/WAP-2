"use client";

import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/state/useStore";
import React, { useEffect, useState } from "react";
import { FavouritesCard } from "../favourites/FavouritesCard";
import { FilterCard } from "../filters/FIlterCard";
import SchoolsCard from "../school_list/SchoolsCard";
import { VysokaStredniVsMaterskaZakladniSelect } from "../VysokaStredniVsMaterskaZakladniSelect";

/**
 * Renders the main frame of the application.
 * @returns The JSX element representing the main frame.
 */
export function MainFrame() {
  const [isShowedLocationPopUp, setIsShowedLocationPopUp] = useState(false);
  const setShowFilter = useStore((state) => state.filter.setShowFilter);
  const setLatitude = useStore((state) => state.filter.setLatitude);
  const setLongitude = useStore((state) => state.filter.setLongitude);
  const showFilter = useStore((state) => state.filter.showFilter);
  function onLocationSave(lat: number, lon: number) {
    setLatitude(lat);
    setLongitude(lon);
    setIsShowedLocationPopUp(false);
    toast({
      description: "Vaše poloha byla uložena pro vyhledávání",
    });
  }

  //Check on init if screen is bigger than 1024px px set showFilter to true
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setShowFilter(true);
    }
    console.log("Setting to default");
  }, [setShowFilter]);

  function onLocationOpen() {
    setIsShowedLocationPopUp(true);
  }

  return (
    <React.Fragment>
      <main className="h-full flex flex-col">
        <VysokaStredniVsMaterskaZakladniSelect />
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
