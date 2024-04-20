"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import {
  SkolySortTypeDescription,
  SkolySortTypeReverseDescription,
  SkolySortTypeValues,
} from "@/state/types";
import { useStore } from "@/state/useStore";
import { SchoolList } from "./SchoolList";
import SkolaVysokaStredniDetail from "./SkolaVysokaStredniDetail";

export default function SchoolsCard() {
  const setSortBy = useStore((state) => state.filter.setSortBy);
  const sortBy = useStore((state) => state.filter.sortBy);

  const selectedVysokaStredni = useStore(
    (state) => state.filter.vysokeStredniSelected
  );
  const selectedMaterskaZakladni = useStore(
    (state) => state.filter.zakladniMaterskaSelected
  );

  return (
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
              <Button variant="outline">
                <span className="hidden lg:inline">Aktuálni lokace</span>
                <span className="lg:hidden">Filtrovat</span>
              </Button>
              <div className="w-4" />
              <Select
                defaultValue={SkolySortTypeDescription[sortBy]}
                onValueChange={(value) => {
                  setSortBy(SkolySortTypeReverseDescription[value]);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Možnosti řazeni</SelectLabel>
                    {SkolySortTypeValues.map((sortType) => (
                      <SelectItem
                        key={sortType}
                        value={SkolySortTypeDescription[sortType]}
                      >
                        {SkolySortTypeDescription[sortType]}
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
  );
}
