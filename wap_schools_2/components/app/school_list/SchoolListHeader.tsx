import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkolaSortByMap } from "@/state/types";
import { LocationPopUp } from "../pop_ups/LocationPopUp";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/state/useStore";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";


export function SchoolListHeader() {
  const setSortBy = useStore((state) => state.filter.setSortBy);
  const setSortSkolkaZakladkaBy = useStore(
    (state) => state.filter.setSortSkolkaZakladkaBy
  );

  const [locationDialogOpen, setLocationDialogOpen] = React.useState(false);
  const selectedLat = useStore((state) => state.filter.latitude);
  const sortBy = useStore((state) => state.filter.sortBy);

  const setLatitude = useStore((state) => state.filter.setLatitude);
  const setLongitude = useStore((state) => state.filter.setLongitude);

  function onLocationSave(lat: number, lon: number) {
    setLatitude(lat);
    setLongitude(lon);
    toast({
      description: "Vaše poloha byla uložena pro vyhledávání",
    });
  }

  return(
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
  )
}