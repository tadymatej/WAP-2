"use client"

import { FavouritesCard } from "../favourites/FavouritesCard";
import { FilterCard } from "../filters/FIlterCard";
import SchoolsCard from "../school_list/SchoolsCard";
import { VysokaStredniVsMaterskaZakladniSelect } from "../VysokaStredniVsMaterskaZakladniSelect";
import { LocationPopUp } from "../pop_ups/LocationPopUp";
import { useStore } from "@/state/useStore";
import { useState } from "react";
import React from "react";
import { ExternalToast } from "sonner";
import { toast } from "@/components/ui/use-toast";



export function MainFrame() {
  const [isShowedLocationPopUp, setIsShowedLocationPopUp] = useState(false);


  const setLatitude = useStore((state) => state.filter.setLatitude);
  const setLongitude = useStore((state) => state.filter.setLongitude);

  function onLocationSave(lat : number, lon : number) {
    setLatitude(lat);
    setLongitude(lon);
    setIsShowedLocationPopUp(false);
    toast({
      description: "Vaše poloha byla uložena pro vyhledávání"
    })
  }

  function onLocationOpen() {
    setIsShowedLocationPopUp(true)
  }

  return(<React.Fragment>
    <main className="h-full flex flex-col p-8">
    <VysokaStredniVsMaterskaZakladniSelect />
    <div className="grid grid-cols-8 gap-4 w-full h-full">
      <div className="col-span-2 gap-4 grid grid-rows-2 h-full">
        <div className="row-span-1 h-full">
          <FilterCard />
        </div>
        <div className="row-span-1  h-full">
          <FavouritesCard />
        </div>
      </div>
      <SchoolsCard onLocationOpen={onLocationOpen} />
      {isShowedLocationPopUp && <LocationPopUp className="z-20 absolute w-2/4 top-2" onSave={onLocationSave}></LocationPopUp>};
    </div>
  </main>
</React.Fragment>
)
}