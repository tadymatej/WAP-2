"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/state/useStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Share } from "lucide-react";
import SkolaVysokaStredniTile from "../school_list/SkolaVysokaStredniTile";
import SkolaZakladniMaterskaTiple from "../school_list/SkolaZakladniMaterskaTile";




/**
 * Renders a card component that displays a list of favorite schools.
 */
export function FavouritesCard() {
  const favourites = useStore((state) => state.filter.favourites);

  const moveToTop = useStore((state) => state.filter.moveFavToBottom);
  const moveToBottom = useStore((state) => state.filter.moveFavToBottom);

  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between items-center pt-4">
        <CardTitle>Oblibene</CardTitle>
        <div className="flex flex-row">
          <Button variant="outline">
            <Share size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="space-y-3">
          {favourites.map((school, index) => {
            if (!("rediteltel" in school)) {
              return (
                <SkolaZakladniMaterskaTiple
                  favIndex={index}
                  key={school.id}
                  skola={school}
                />
              );
            }
            return (
              <SkolaVysokaStredniTile
                favIndex={index}
                key={school.id}
                skola={school}
              />
            );
          })}
          {favourites.length === 0 && (
            <div className="text-slate-600 font-normal text-start text-base">
              Zde se zobrazí vaše oblíbené školy.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
