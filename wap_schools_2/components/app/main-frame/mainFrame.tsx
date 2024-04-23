"use client";

import { toast } from "@/components/ui/use-toast";
import { MD, XXL } from "@/state/types";
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
  const [init, setInit] = useState(false);
  const [isShowedLocationPopUp, setIsShowedLocationPopUp] = useState(false);
  const setLatitude = useStore((state) => state.filter.setLatitude);
  const setLongitude = useStore((state) => state.filter.setLongitude);
  const showFilter = useStore((state) => state.filter.showFilter);
  const setShowFavouritesDrawer = useStore(
    (state) => state.filter.setShowFavoritesDrawer
  );
  const setShowFilterDrawer = useStore(
    (state) => state.filter.setShowFilterDrawer
  );
  function onLocationSave(lat: number, lon: number) {
    setLatitude(lat);
    setLongitude(lon);
    setIsShowedLocationPopUp(false);
    toast({
      description: "Vaše poloha byla uložena pro vyhledávání",
    });
  }
  const selectedVysokaStredni = useStore(
    (state) => state.filter.vysokeStredniSelected
  );
  const selectedMaterskaZakladni = useStore(
    (state) => state.filter.zakladniMaterskaSelected
  );
  const setShowFilter = useStore((state) => state.filter.setShowFilter);
  const setWindowWidth = useStore((state) => state.filter.setWindowWidth);

  useEffect(() => {
    const handleResize = (init: boolean) => {
      setWindowWidth(window.innerWidth);
      console.log("ahooy", init);
      if (window.innerWidth > XXL) {
        setShowFilter(true);
      }
      if (window.innerWidth < XXL && window.innerWidth > MD) {
        if (
          selectedMaterskaZakladni == undefined &&
          selectedVysokaStredni == undefined
        ) {
          setShowFilter(true);
        } else {
          setShowFilter(false);
        }
      }
      if (window.innerWidth <= MD) {
        setShowFilter(false);
        if (
          selectedMaterskaZakladni == undefined &&
          selectedVysokaStredni == undefined &&
          init
        ) {
          console.log("Calling 1111 show filter drawer");
          setShowFilterDrawer(true);
        }
      }
    };
    handleResize(true);
    window.addEventListener("resize", handleResize.bind(null, false));
  }, []);

  useEffect(() => {
    console.log("Calling 2222 show filter drawer");
    setInit(true);
  }, []);

  function onLocationOpen() {
    setIsShowedLocationPopUp(true);
  }

  return (
    <React.Fragment>
      <main className="h-full flex flex-col p-4 ">
        <VysokaStredniVsMaterskaZakladniSelect />
        <div className="flex flex-row">
          <div
            className={
              showFilter
                ? "md:block sm:hidden  md:basis-1/2 xl:basis-1/3 2xl:basis-1/4 flex-grow mr-4 transition-all duration-500 ease-in-out"
                : "w-0 h-full overflow-hidden transition-all duration-500 ease-in-out"
            }
          >
            <FilterCard />
            <div className="h-4" />
            <FavouritesCard />
          </div>
          <div className="basis-1/2 xl:basis-2/3 2xl:basis-3/4 flex-grow">
            <SchoolsCard />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
