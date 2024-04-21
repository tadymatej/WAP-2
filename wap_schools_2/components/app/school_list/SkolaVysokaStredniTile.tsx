import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniAllData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Colors } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useStore } from "@/state/useStore";
import { EllipsisVertical, Heart, UserRound } from "lucide-react";
import BadgeCustom from "../generic/BadgeCustom";
import InfoTile from "../generic/InfoTile";
import PodskolTile from "./PodskolTile";

interface SkolaVysokaStredniTileProps {
  skola: SkolaVysokaStredniType;
  inFavorites: boolean;
}

export default function SkolaVysokaStredniTile({
  skola,
  inFavorites = false,
}: SkolaVysokaStredniTileProps) {
  const favouriteVysokeStredniIds = useStore((state) =>
    state.filter.getFavouritesVysokeStredniSkoly()
  ).map((skola) => skola.id);

  const isFavourite = favouriteVysokeStredniIds.includes(skola.id);

  const selectedVysokaStredni = useStore(
    (state) => state.filter.vysokeStredniSelected
  );

  const selectVysokaStredni = useStore(
    (state) => state.filter.setVysokeStredniSelected
  );

  const isSelected = selectedVysokaStredni?.id == skola.id;
  //const isVysokaSkola = [
  //  ...new Set(
  //    skola.podskola
  //      .map((podskola) => podskola.druh_podskoly?.nazev)
  //      .filter((druh) => druh !== null)
  //  ),
  //];
  //Give me all the unique values of druh_podskoly.nazev that are not null
  //const isVysokaSkola = [
  //  ...new Set(
  //    skola.podskola
  //      .map((podskola) => podskola.druh_podskoly?.nazev)
  //      .filter((druh) => druh !== null)
  //  ),
  //];
  const druhy = skola.podskola
    .map((podskola) => podskola.druh_podskoly?.nazev)
    .filter(
      (druh, index, self) =>
        druh !== null && druh !== undefined && self.indexOf(druh) === index
    ) as string[];

  console.log("Druhy: ", druhy);
  const badges = (
    <div className="flex flex-wrap items-center space-x-2">
      {isFavourite && (
        <BadgeCustom
          Icon={Heart}
          text="Oblíbená"
          iconColor={Colors.redFavourite}
        />
      )}
      {druhy.map((druh) => (
        <BadgeCustom key={druh} text={druh} />
      ))}
    </div>
  );
  return (
    <Card
      className={cn("transition-all hover:bg-accent", isSelected && "bg-muted")}
      onClick={() => {
        selectVysokaStredni(isSelected ? undefined : skola);
      }}
    >
      <CardContent className="p-4">
        {!inFavorites ? (
          badges
        ) : (
          <div className="flex flex-row">
            <div className="flex flex-grow">{badges}</div>
            <div className="w-3" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="p-1">
                  <EllipsisVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="h-2" />
        <div className="text-base font-medium text-foreground">
          {skola.nazev}
        </div>
        <div className="h-2" />
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {skola.reditel && <InfoTile Icon={UserRound} text={skola.reditel} />}
          {skola.reditel && <InfoTile Icon={UserRound} text={skola.reditel} />}
          {skola.reditel && <InfoTile Icon={UserRound} text={skola.reditel} />}
          {skola.reditel && <InfoTile Icon={UserRound} text={skola.reditel} />}
          {skola.reditel && <InfoTile Icon={UserRound} text={skola.reditel} />}
        </div>
        <div className="h-4" />
        <Separator />
        <div className="h-4" />
        <div className="space-y-3">
          {skola.podskola.map((podskola) => {
            return (
              <PodskolTile
                key={podskola.druh_podskoly?.nazev}
                podskola={podskola}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
