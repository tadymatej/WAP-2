"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { SearchingType } from "@/enums/filter-types";
import { cn } from "@/lib/utils";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { SkolaSortByMap } from "@/state/types";
import { useStore } from "@/state/useStore";
import React from "react";
import { LocationPopUp } from "../pop_ups/LocationPopUp";
import { SchoolList } from "./SchoolList";
import SkolaVysokaStredniDetail from "./SkolaVysokaStredniDetail";
import SkolaZakladniMaterskaDetail from "./SkolaZakladniMaterskaDetail";

export interface SchoolsCardProps {}

export default function SchoolsCard() {
  const setSortBy = useStore((state) => state.filter.setSortBy);
  const setSortSkolkaZakladkaBy = useStore(
    (state) => state.filter.setSortSkolkaZakladkaBy
  );

  const selectedLat = useStore((state) => state.filter.latitude);
  const searchingType = useStore((state) => state.filter.searchingType);
  const sortBy = useStore((state) => state.filter.sortBy);
  const setLatitude = useStore((state) => state.filter.setLatitude);
  const setLongitude = useStore((state) => state.filter.setLongitude);

  const selectedVysokaStredni = useStore(
    (state) => state.filter.vysokeStredniSelected
  );
  const selectedMaterskaZakladni = useStore(
    (state) => state.filter.zakladniMaterskaSelected
  );

  function onLocationSave(lat: number, lon: number) {
    setLatitude(lat);
    setLongitude(lon);
    toast({
      description: "Vaše poloha byla uložena pro vyhledávání",
    });
  }

  const [locationDialogOpen, setLocationDialogOpen] = React.useState(false);
  const showingDetails =
    (selectedVysokaStredni && searchingType == SearchingType.StredniVysoke) ||
    (selectedMaterskaZakladni &&
      searchingType == SearchingType.MaterskeZakladni);
  return (
    <React.Fragment>
      <Card className=" col-span-6 w-full">
        <CardContent className="pt-4 grid grid-cols-2">
          <div
            className={cn(
              "flex flex-col ",
              showingDetails ? "col-span-1" : "col-span-2"
            )}
          >
            <div className="flex flex-row justify-between items-center">
              <CardTitle>Nalezené školy</CardTitle>
              <div className="flex flex-row">
                {/*<LocationPopUp className="z-20 absolute w-2/4 top-2" onSave={onLocationSave}></LocationPopUp>*/}
                <Dialog
                  open={locationDialogOpen}
                  onOpenChange={setLocationDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <span className="hidden lg:inline">
                        {selectedLat ? "Změnit polohu" : "Vybrat lokaci"}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <LocationPopUp
                      onSave={(lat, lon) => {
                        setLocationDialogOpen(false);
                        onLocationSave(lat, lon);
                      }}
                    ></LocationPopUp>
                  </DialogContent>
                </Dialog>

                <div className="w-4" />
                <Select
                  defaultValue={sortBy.toString()}
                  onValueChange={(value) => {
                    const type = parseInt(value) as SkolaOrderByEnum;
                    setSortSkolkaZakladkaBy(parseInt(value));
                    setSortBy(type);

                    if (
                      type == SkolaOrderByEnum.Location &&
                      selectedLat == undefined
                    ) {
                      setLocationDialogOpen(true);
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Možnosti řazení</SelectLabel>
                      {SkolaSortByMap.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.type.toString()}
                        >
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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

          {showingDetails && (
            <div className="col-span-1 flex flex-row">
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
            </div>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
