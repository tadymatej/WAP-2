"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/state/useStore";
import { FilterMultiSelectWrapperType, SearchingType } from "../../../enums/filter-types";
import FilterMultiSelectWrapper from "./FilterMultiSelectWrapper";
import { boolean } from "zod";
import { Button } from "@/components/ui/button";

export function FilterCard() {
  const setToDefault = useStore((state) => state.filter.setToDefault);
  const searchingType = useStore((state) => state.filter.searchingType);
  const setShowList = useStore((state) => state.responsive.setShowList);
  const setShowFilters = useStore((state) => state.responsive.setShowFilters);

  function onSubmitFilters() {
    setShowList(true);
    setShowFilters(false);
  }

  const advancedOptions = searchingType == SearchingType.StredniVysoke && (
    <div className="flex flex-col">
      <div className="h-3" />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Pokročilé možnosti
          </span>
        </div>
      </div>
      <div className="h-2" />
      <div className="grid gap-4">
        <div className="space-y-1">
          <Label htmlFor="name">Vyučované obory</Label>
          <FilterMultiSelectWrapper
            type={FilterMultiSelectWrapperType.VyucovaneObory}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Typ školy</Label>
          <FilterMultiSelectWrapper
            type={FilterMultiSelectWrapperType.TypSkoly}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Příjmací zkoušky</Label>
          <FilterMultiSelectWrapper
            type={FilterMultiSelectWrapperType.PrijmaciZkousky}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Školné</Label>
          <FilterMultiSelectWrapper
            type={FilterMultiSelectWrapperType.Skolne}
          />
        </div>
      </div>
    </div>
    );

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Možnosti vyhledávání</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kraj" onValueChange={() => setToDefault()}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger disabled={false} value="mesto">
              Město
            </TabsTrigger>
            <TabsTrigger disabled={false} value="okres">
              Okres
            </TabsTrigger>
            <TabsTrigger
              disabled={false}
              value="mestska-cast"
              className="col-span-2"
            >
              Městská část
            </TabsTrigger>
            <TabsTrigger disabled={false} value="kraj">
              Kraj
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mesto">
            <ScrollArea>
              <div className="space-y-1">
                <Label htmlFor="name">Město / Obec</Label>
                <FilterMultiSelectWrapper
                  type={FilterMultiSelectWrapperType.Mesto}
                />
              </div>
              {advancedOptions}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="okres">
            <ScrollArea>
              <div className="space-y-1">
                <Label htmlFor="name">Okres</Label>
                <FilterMultiSelectWrapper
                  type={FilterMultiSelectWrapperType.Okres}
                />
                {advancedOptions}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="mestska-cast">
            <ScrollArea>
              <div className="space-y-1">
                <Label htmlFor="name">Městská část</Label>
                <FilterMultiSelectWrapper
                  type={FilterMultiSelectWrapperType.MestskaCast}
                />
                {advancedOptions}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="kraj">
            <ScrollArea>
              <div className="space-y-1">
                <Label htmlFor="name">Kraj</Label>
                <FilterMultiSelectWrapper
                  type={FilterMultiSelectWrapperType.Kraj}
                />
                {advancedOptions}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <Button onClick={onSubmitFilters}>Potvrdit</Button>
      </CardContent>
    </Card>
  );
}
