import { Button } from "@/components/ui/button";
import { SchoolList } from "./SchoolList";
import { SchoolDetail } from "./SchoolDetail";
import { SchoolListHeader } from "./SchoolListHeader";
import React from "react";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { useStore } from "@/state/useStore";
import { SearchingType } from "@/enums/filter-types";


export function SchoolListDetailContainer() {

  const selectedLat = useStore((state) => state.filter.latitude);
  const sortBy = useStore((state) => state.filter.sortBy);
  const showDetail = useStore((state) => state.responsive.showDetail);

  const searchingType = useStore((state) => state.filter.searchingType);

  const selectedVysokaStredni = useStore(
    (state) => state.filter.vysokeStredniSelected
  );
  const selectedMaterskaZakladni = useStore(
    (state) => state.filter.zakladniMaterskaSelected
  );

  const showingDetails =
    (selectedVysokaStredni && searchingType == SearchingType.StredniVysoke) ||
    (selectedMaterskaZakladni &&
      searchingType == SearchingType.MaterskeZakladni);

  return (
      <React.Fragment>
      <div className={"flex flex-col" + showingDetails ? " col-span-1" : " col-span-2"}>
              <SchoolListHeader></SchoolListHeader>
              <div className="h-6" />
              {sortBy == SkolaOrderByEnum.Location && selectedLat == undefined ? (
                <div className="flex flex-col items-start justify-center text-start">
                  <div className="h-8" />
                  <div className="font-semibold text-xl text-start">
                    Potřebujeme znát lokaci pro řazení výsledků vyhledávání
                  </div>
                  <div className="h-2" />
                  <div className="text-start font-normal text-base">
                    Lokaci potřebujeme, abychom mohli najít školy, které jsou vám
                    nejbliže. Nebo zvolte jiný způsob řazení.
                  </div>
                  <div className="h-4" />
                  <Button>Zvolit lokaci</Button>
                </div>
              ) : (
                <SchoolList />
              )}
            </div>
            {(showingDetails || showDetail) && 
              <div className={"col-span-1 flex flex-row"}>
                <SchoolDetail></SchoolDetail>
              </div>
            }
    </React.Fragment>
  )
}