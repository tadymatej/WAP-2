"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  SearchingType,
  SearchingTypeDescription,
  SearchingTypeIcon,
} from "@/enums/filter-types";
import { cn } from "@/lib/utils";
import { MD } from "@/state/types";
import { useStore } from "@/state/useStore";
import { Filter, FilterX, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CustomNavItem from "./CustomNavitem";
import { FilterCard } from "./filters/FIlterCard";
import SkolaVysokaStredniDetail from "./school_list/SkolaVysokaStredniDetail";
import SkolaZakladniMaterskaDetail from "./school_list/SkolaZakladniMaterskaDetail";

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
          console.log("Showing filter");
          if (window.innerWidth > MD) {
            setShowFilter(!showFilter);
          } else {
            setShowFilterDrawer(!showFilterDrawer);
          }
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
      <Drawer
        open={filter.showSchoolDetail}
        dismissible={false}
        onClose={() => {
          filter.setShowSchoolDetail(false);
        }}
        onOpenChange={(open) => {
          filter.setShowSchoolDetail(open);
        }}
      >
        <DrawerTrigger></DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-row">
            <Button
              onClick={() => {
                filter.setShowSchoolDetail(false);
              }}
              variant="ghost"
            >
              <XIcon size={24} />
            </Button>
          </div>
          <div className="h-4" />
          <ScrollArea
            className={"[&>[data-radix-scroll-area-viewport]]:max-h-[70vh]"}
          >
            <CardContent className="">
              {filter.vysokeStredniSelected && (
                <SkolaVysokaStredniDetail
                  skola={filter.vysokeStredniSelected}
                />
              )}
              {filter.zakladniMaterskaSelected && (
                <SkolaZakladniMaterskaDetail
                  skola={filter.zakladniMaterskaSelected}
                />
              )}
            </CardContent>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
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
