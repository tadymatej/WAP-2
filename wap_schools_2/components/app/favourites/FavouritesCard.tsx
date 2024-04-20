"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/state/useStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Share } from "lucide-react";
import SkolaVysokaStredniTile from "../school_list/SkolaVysokaStredniTile";

export function FavouritesCard() {
  const favourites = useStore((state) => state.filter.favourites);
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between items-center pt-4">
        <CardTitle>Oblibene</CardTitle>
        <div className="flex flex-row">
          <Button variant="outline">
            <Share size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          {favourites.map((school, index) => {
            if (!("rediteltel" in school)) {
              return <div key={index} />;
            }
            return (
              <SkolaVysokaStredniTile
                inFavorites
                key={school.id}
                skola={school}
              />
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
