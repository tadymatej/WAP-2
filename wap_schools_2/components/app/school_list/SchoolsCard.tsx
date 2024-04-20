"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SkolySortTypeDescription,
  SkolySortTypeReverseDescription,
  SkolySortTypeValues,
} from "@/state/types";
import { useStore } from "@/state/useStore";
import { SchoolList } from "./SchoolList";

export default function SchoolsCard() {
  const setSortBy = useStore((state) => state.filter.setSortBy);
  const sortBy = useStore((state) => state.filter.sortBy);

  return (
    <Card className=" col-span-6 w-full">
      <CardHeader className="flex flex-row justify-between">
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
      </CardHeader>
      <CardContent>
        <SchoolList />
      </CardContent>
    </Card>
  );
}
