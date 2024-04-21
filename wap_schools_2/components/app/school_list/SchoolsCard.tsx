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
import { cn } from "@/lib/utils";
import { SkolaSortByMap } from "@/state/types";
import { useStore } from "@/state/useStore";
import React from "react";
import { LocationPopUp } from "../pop_ups/LocationPopUp";
import { SchoolList } from "./SchoolList";
import SkolaVysokaStredniDetail from "./SkolaVysokaStredniDetail";

export interface SchoolsCardProps {
  onLocationOpen: () => void;
}

export default function SchoolsCard(props: SchoolsCardProps) {
  const setSortBy = useStore((state) => state.filter.setSortBy);
  const setSortSkolkaZakladkaBy = useStore(
    (state) => state.filter.setSortSkolkaZakladkaBy
  );
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

  return (
    <React.Fragment>
      <Card className=" col-span-6 w-full">
        <CardContent className="pt-4 grid grid-cols-2">
          <div
            className={cn(
              "flex flex-col ",
              selectedVysokaStredni || selectedMaterskaZakladni
                ? "col-span-1"
                : "col-span-2"
            )}
          >
            <div className="flex flex-row justify-between items-center">
              <CardTitle>Odpovidajici školy</CardTitle>
              <div className="flex flex-row">
                {/*<LocationPopUp className="z-20 absolute w-2/4 top-2" onSave={onLocationSave}></LocationPopUp>*/}
                <Dialog
                  open={locationDialogOpen}
                  onOpenChange={setLocationDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <span className="hidden lg:inline">Aktuálni lokace</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <LocationPopUp
                      onSave={() => {
                        setLocationDialogOpen(false);
                        props.onLocationOpen();
                      }}
                    ></LocationPopUp>
                  </DialogContent>
                </Dialog>

                <div className="w-4" />
                <Select
                  defaultValue={sortBy.toString()}
                  onValueChange={(value) => {
                    setSortSkolkaZakladkaBy(parseInt(value));
                    setSortBy(parseInt(value));
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Možnosti řazeni</SelectLabel>
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
            <SchoolList />
          </div>

          {(selectedVysokaStredni || selectedMaterskaZakladni) && (
            <div className="col-span-1 flex flex-row">
              <div className="w-6" />
              <Separator orientation="vertical" />
              <div className="w-6" />
              {selectedVysokaStredni && (
                <SkolaVysokaStredniDetail skola={selectedVysokaStredni} />
              )}
              {selectedMaterskaZakladni && (
                <div className="bg-red-500 h-20 w-20" />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
