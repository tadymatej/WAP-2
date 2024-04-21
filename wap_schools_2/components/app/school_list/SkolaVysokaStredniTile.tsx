import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { addressToText, vzdalenostInKmFunc } from "@/helpers/address-to-text";
import { Colors } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useStore } from "@/state/useStore";
import {
  EllipsisVertical,
  Heart,
  LinkIcon,
  LocateFixed,
  Mail,
  Phone,
  Route,
  Star,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import BadgeCustom from "../generic/BadgeCustom";
import InfoTile from "../generic/InfoTile";
import PodskolTile from "./PodskolTile";

interface SkolaVysokaStredniTileProps {
  skola: SkolaVysokaStredniType;
  favIndex: number | undefined;
}

/**
 * Renders information about a high school in a tile
 * @param skola - school data
 * @param favIndex - index of the favourite
 * @returns
 */
export default function SkolaVysokaStredniTile({
  skola,
  favIndex,
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

  const druhy = skola.podskola
    .map((podskola) => podskola.druh_podskoly?.nazev)
    .filter(
      (druh, index, self) =>
        druh !== null && druh !== undefined && self.indexOf(druh) === index
    ) as string[];

  const badges = (
    <div className="flex flex-wrap items-center space-x-2">
      {favIndex && (
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

  const moveToTop = useStore((state) => state.filter.moveFavToTop);
  const moveToBottom = useStore((state) => state.filter.moveFavToBottom);

  const userLatitude = useStore((state) => state.filter.latitude);
  const userLongitude = useStore((state) => state.filter.longitude);
  const goalLatitude = skola.lat;
  const goalLongitude = skola.lon;

  const vzdalenostInKm = vzdalenostInKmFunc({
    userLatitude,
    userLongitude,
    goalLatitude,
    goalLongitude,
  });

  return (
    <Card
      className={cn(
        "transition-all hover:bg-accent/60",
        isSelected && "bg-muted/60"
      )}
      onClick={() => {
        selectVysokaStredni(isSelected ? undefined : skola);
      }}
    >
      <CardContent className="p-4">
        {favIndex == undefined ? (
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
                <DropdownMenuItem
                  onClick={() => {
                    moveToTop(favIndex);
                  }}
                >
                  Posunot nahoru
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    moveToBottom(favIndex);
                  }}
                >
                  Posunot dolů
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="h-2" />
        <div className="text-base font-medium text-foreground">
          {skola.nazev}
        </div>
        <div className="h-2" />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {skola.reditel && <InfoTile Icon={UserRound} text={skola.reditel} />}
          {skola.kontaktniosobatel && (
            <InfoTile Icon={Phone} text={skola.kontaktniosobatel} />
          )}
          {skola.email && <InfoTile Icon={Mail} text={skola.email} />}
          {skola.prumer_hvezdicek && (
            <InfoTile
              Icon={Star}
              text={(skola.prumer_hvezdicek / -10).toFixed(1) + " / 5"}
            />
          )}
          {vzdalenostInKm && (
            <InfoTile Icon={Route} text={vzdalenostInKm.toFixed(1) + " km"} />
          )}
          {skola.adresa && (
            <InfoTile Icon={LocateFixed} text={addressToText(skola.adresa)} />
          )}

          {skola.url && (
            <Link
              href={
                skola.url.startsWith("http://") ||
                skola.url.startsWith("https://")
                  ? skola.url
                  : `https://${skola.url}`
              }
            >
              <InfoTile Icon={LinkIcon} text={skola.url} />
            </Link>
          )}
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
