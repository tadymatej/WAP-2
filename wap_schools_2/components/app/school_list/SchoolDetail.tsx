import { Separator } from "@/components/ui/separator";
import React from "react";
import SkolaVysokaStredniDetail from "./SkolaVysokaStredniDetail";
import SkolaZakladniMaterskaDetail from "./SkolaZakladniMaterskaDetail";
import { useStore } from "@/state/useStore";
import { SearchingType } from "@/enums/filter-types";


export function SchoolDetail() {
  const searchingType = useStore((state) => state.filter.searchingType);

  const selectedVysokaStredni = useStore(
    (state) => state.filter.vysokeStredniSelected
  );
  const selectedMaterskaZakladni = useStore(
    (state) => state.filter.zakladniMaterskaSelected
  );

  return (
    <React.Fragment>
      <div className="w-6" />
      <Separator orientation="vertical" />
      <div className="w-6" />
      {selectedVysokaStredni &&
        searchingType == SearchingType.StredniVysoke && (
          <SkolaVysokaStredniDetail skola={selectedVysokaStredni} />
        )}
      {selectedMaterskaZakladni &&
        searchingType == SearchingType.MaterskeZakladni && (
          <SkolaZakladniMaterskaDetail
            skola={selectedMaterskaZakladni}
          />
        )}
    </React.Fragment>
  )
}