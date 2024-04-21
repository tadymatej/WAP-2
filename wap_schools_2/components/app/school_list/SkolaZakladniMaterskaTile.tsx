import { SkolaZakladniMaterskaType } from "@/actions/types/skolaZakladniMaterskaType";
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
  LocateFixed,
  Mail,
  Route,
  Speech,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import BadgeCustom from "../generic/BadgeCustom";
import DotInfoTile from "../generic/DotInfoTile";
import InfoTile from "../generic/InfoTile";

interface SkolaVysokaStredniTileProps {
  skola: SkolaZakladniMaterskaType;
  favIndex: number | undefined;
}

/**
 * Renders information about a high school in a tile
 * @param skola - school data
 * @param favIndex - index of the favourite
 * @returns tile with elementary and kindergarten school information
 */
export default function SkolaZakladniMaterskaTiple({
  skola,
  favIndex,
}: SkolaVysokaStredniTileProps) {
  const favouriteVysokeStredniIds = useStore((state) =>
    state.filter.getFavouritesMaterskeSkoly()
  ).map((skola) => skola.id);

  const isFavourite = favouriteVysokeStredniIds.includes(skola.id);

  const selectedZakladniMaterska = useStore(
    (state) => state.filter.zakladniMaterskaSelected
  );

  const moveToTop = useStore((state) => state.filter.moveFavToTop);
  const moveToBottom = useStore((state) => state.filter.moveFavToBottom);

  const setMaterskaZakladniSelected = useStore(
    (state) => state.filter.setMaterskaZakladniSelected
  );

  const isSelected = selectedZakladniMaterska?.id == skola.id;

  const obory = skola.obor_skolky_zakladky.map((obory) => obory.nazev);

  const badges = (
    <div className="flex flex-wrap items-center space-x-2">
      {isFavourite && (
        <BadgeCustom
          Icon={Heart}
          text="Oblíbená"
          iconColor={Colors.redFavourite}
        />
      )}
      {skola.skola_druh_typ?.nazev && (
        <BadgeCustom
          key={skola.skola_druh_typ?.nazev}
          text={skola.skola_druh_typ?.nazev}
        />
      )}
    </div>
  );

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
        setMaterskaZakladniSelected(isSelected ? undefined : skola);
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
          {skola.reditelemail && (
            <InfoTile Icon={Mail} text={skola.reditelemail} />
          )}
          {skola.typ_zrizovatele?.nazev && (
            <InfoTile Icon={UserRound} text={skola.typ_zrizovatele.nazev} />
          )}
          {skola.jazyk?.nazev && (
            <InfoTile Icon={Speech} text={skola.jazyk.nazev} />
          )}

          {skola.kapacita && (
            <InfoTile Icon={Users} text={skola.kapacita.toFixed(1)} />
          )}
          {skola.prumer_hvezdicek && (
            <InfoTile
              Icon={Star}
              text={(skola.prumer_hvezdicek / 10).toFixed(1) + " / 5"}
            />
          )}
          {vzdalenostInKm && (
            <InfoTile Icon={Route} text={vzdalenostInKm.toFixed(1) + " km"} />
          )}
          {skola.skolkazakladka_adresa && (
            <InfoTile
              Icon={LocateFixed}
              text={skola.skolkazakladka_adresa
                .map((adresa) => addressToText(adresa.adresa))
                .join(", ")}
            />
          )}
        </div>

        {obory.length > 1 && (
          <>
            <div className="h-4" />
            <Separator />
            <div className="h-4" />
            <div className="space-y-3">
              <div className="flex flex-col">
                <div className="text-sm font-normal text-slate-600">Obory</div>
                <div className="h-2" />
                <div className="pl-8 flex flex-wrap gap-x-4 gap-y-4">
                  {obory.map((obornazev) => (
                    <DotInfoTile key={obornazev} text={obornazev ?? ""} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
