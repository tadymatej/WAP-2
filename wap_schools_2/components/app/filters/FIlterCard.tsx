"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/state/useStore";
import { FilterMultiSelectWrapperType } from "../../../enums/filter-types";
import FilterMultiSelectWrapper from "./FilterMultiSelectWrapper";

export function FilterCard() {
  const advancedOptions = (
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

  const setToDefault = useStore((state) => state.filter.setToDefault);
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Možnosti vyhledávání</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="kraj"
          className="w-full"
          onValueChange={() => setToDefault()}
        >
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
            <ScrollArea
              className={"[&>[data-radix-scroll-area-viewport]]:max-h-[30vh]"}
            >
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
            <ScrollArea
              className={"[&>[data-radix-scroll-area-viewport]]:max-h-[30vh]"}
            >
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
            <ScrollArea
              className={"[&>[data-radix-scroll-area-viewport]]:max-h-[30vh]"}
            >
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
            <ScrollArea
              className={"[&>[data-radix-scroll-area-viewport]]:max-h-[30vh]"}
            >
              <div className="space-y-1">
                <Label htmlFor="name">Kraj</Label>
                <FilterMultiSelectWrapper
                  type={FilterMultiSelectWrapperType.Kraj}
                />
                {advancedOptions}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* <TabsContent value="advanced">
              <Card>
              <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
              Change your password here. After saving, out.
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
              <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
              </div>
              </CardContent>
              <CardFooter>
              <Button>Save password</Button>
              </CardFooter>
              </Card>
            </TabsContent> */}
        </Tabs>
      </CardContent>
    </Card>
  );
}
