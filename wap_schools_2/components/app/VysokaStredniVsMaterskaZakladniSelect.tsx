"use client";

import {
  SearchingType,
  SearchingTypeDescription,
  SearchingTypeIcon,
} from "@/enums/filter-types";
import { cn } from "@/lib/utils";
import { useStore } from "@/state/useStore";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CustomNavItem from "./CustomNavitem";

export function VysokaStredniVsMaterskaZakladniSelect() {
  const setSearchingType = useStore((state) => state.filter.setSearchingType);
  const searchingType = useStore((state) => state.filter.searchingType);
  const setShowFilter = useStore((state) => state.filter.setShowFilter);
  const showFilter = useStore((state) => state.filter.showFilter);
  return (
    <div className="relative">
      <Button
        onClick={() => {
          if (window.innerWidth > 1024) {
            setShowFilter(!showFilter);
          } else {
          }
        }}
      >
        Filter
      </Button>
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center")}>
          <CustomNavItem
            onClick={() => setSearchingType(SearchingType.MaterskeZakladni)}
            Icon={SearchingTypeIcon[SearchingType.MaterskeZakladni]}
            isActive={searchingType === SearchingType.MaterskeZakladni}
            name={SearchingTypeDescription[SearchingType.MaterskeZakladni]}
          />
          <CustomNavItem
            onClick={() => setSearchingType(SearchingType.StredniVysoke)}
            Icon={SearchingTypeIcon[SearchingType.StredniVysoke]}
            isActive={searchingType === SearchingType.StredniVysoke}
            name={SearchingTypeDescription[SearchingType.StredniVysoke]}
          />
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
