"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  SearchingType,
  SearchingTypeDescription,
  SearchingTypeIcon,
} from "@/enums/filter-types";
import { cn } from "@/lib/utils";
import { useStore } from "@/state/useStore";
import { Filter, FilterX } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CustomNavItem from "./CustomNavitem";
import { FilterCard } from "./filters/FIlterCard";

// Top navigation bar
export function VysokaStredniVsMaterskaZakladniSelect() {
  const setSearchingType = useStore((state) => state.filter.setSearchingType);
  const searchingType = useStore((state) => state.filter.searchingType);
  const setShowFilter = useStore((state) => state.filter.setShowFilter);
  const showFilter = useStore((state) => state.filter.showFilter);
  const showFavouritesDrawer = useStore(
    (state) => state.filter.showFavouritesDrawer
  );
  const setShowFilterDrawer = useStore(
    (state) => state.filter.setShowFilterDrawer
  );
  const showFilterDrawer = useStore((state) => state.filter.showFilterDrawer);
  const setShowFavoritesDrawer = useStore(
    (state) => state.filter.setShowFavoritesDrawer
  );

  const filter = useStore((state) => state.filter);

  console.log({
    showFilterDrawer: showFilterDrawer,
    selectedVysoka: filter.vysokeStredniSelected,
    selectedMaterska: filter.zakladniMaterskaSelected,
  });

  return (
    <div className="flex flex-row items-center pb-4">
      <Button
        variant="outline"
        onClick={() => {
          setShowFilter(!showFilter);
        }}
      >
        {showFilter ? <FilterX size={20} /> : <Filter size={20} />}
      </Button>
      <Drawer open={showFilterDrawer} onOpenChange={setShowFilterDrawer}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent>
          <FilterCard
            inDialog
            onFilterClose={() => setShowFilterDrawer(false)}
          />
        </DrawerContent>
      </Drawer>
      {/*//To Show selected school*/}
      {/*<div className="">
        <Drawer
          open={
            filter.vysokeStredniSelected !== undefined ||
            filter.zakladniMaterskaSelected !== undefined
          }
          onClose={() => {
            filter.setVysokeStredniSelected(undefined);
            filter.setMaterskaZakladniSelected(undefined);
          }}
        >
          <DrawerTrigger></DrawerTrigger>
          <DrawerContent>
            {filter.vysokeStredniSelected && (
              <SkolaVysokaStredniDetail skola={filter.vysokeStredniSelected} />
            )}
            {filter.zakladniMaterskaSelected && (
              <SkolaZakladniMaterskaDetail
                skola={filter.zakladniMaterskaSelected}
              />
            )}
          </DrawerContent>
        </Drawer>
      </div>*/}
      <div className="w-4" />
      <ScrollArea className="max-w-[600px] lg:max-w-none sm:flex flex-shrink">
        <div className={cn("flex items-center")}>
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
