import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniAllData";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Colors } from "@/lib/colors";
import { useStore } from "@/state/useStore";
import {
  Bed,
  CookingPot,
  Heart,
  Notebook,
  Phone,
  Star,
  UserRound,
} from "lucide-react";
import InfoDetailTile from "../generic/InfoDetailTile";
import PodskolaDetailsTile from "./PodskolaDetailsTile";

interface SkolaVysokaStredniDetailProps {
  skola: SkolaVysokaStredniType;
}

export default function SkolaVysokaStredniDetail({
  skola,
}: SkolaVysokaStredniDetailProps) {
  const favouriteVysokeStredni = useStore((state) =>
    state.filter.getFavouritesVysokeStredniSkoly()
  );
  const isFavourite = favouriteVysokeStredni
    .map((skola) => skola.id)
    .some((id) => id === skola.id);

  const setFavourite = useStore((state) => state.filter.setFavourite);

  return (
    <div className="flex flex-col items-stretch w-full">
      <div className="flex flex-row justify-between items-center">
        <CardTitle className="text-ellipsis flex-grow leading-8">
          {skola.nazev}
        </CardTitle>
        <div className="w-4" />
        <Button
          variant="outline"
          onClick={() =>
            !isFavourite
              ? setFavourite([...favouriteVysokeStredni, skola])
              : setFavourite(
                  favouriteVysokeStredni.filter((fav) => fav.id !== skola.id)
                )
          }
        >
          {isFavourite ? (
            <Heart color={Colors.redFavourite} fill={Colors.redFavourite} />
          ) : (
            <Heart className="text-slate-600" />
          )}
        </Button>
      </div>
      <div className="h-4" />
      <div className="flex flex-col gap-y-4">
        {skola.reditel && (
          <InfoDetailTile
            text={"Ředitel/ka"}
            Icon={UserRound}
            description={skola.reditel}
          />
        )}
        {skola.rediteltel && (
          <InfoDetailTile
            text={"Ředitel/ka telefon"}
            Icon={Phone}
            description={skola.rediteltel}
          />
        )}
        {skola.kontaktniosoba && (
          <InfoDetailTile
            text={"Kontaktní osoba"}
            Icon={UserRound}
            description={skola.kontaktniosoba}
          />
        )}
        {skola.kontaktniosobatel && (
          <InfoDetailTile
            text={"Kontaktni osoba telefon"}
            Icon={Phone}
            description={skola.kontaktniosobatel}
          />
        )}

        {skola.hodnoceni.length != 0 && (
          <InfoDetailTile
            text={"Hodnocení"}
            Icon={Star}
            description={(
              skola.hodnoceni.reduce(
                (acc, hodnoceni) => acc + hodnoceni.hvezdicek,
                0
              ) / skola.hodnoceni.length
            ).toFixed(1)}
          />
        )}
        {skola.poznamka && (
          <InfoDetailTile
            text={"Poznámka"}
            Icon={Notebook}
            description={skola.poznamka}
          />
        )}
        {skola.stravovani && (
          <InfoDetailTile
            text={"Cena za stravováni"}
            Icon={CookingPot}
            description={skola.stravovani.toFixed(1) + " Kč"}
          />
        )}
        {skola.ubytovani && (
          <InfoDetailTile
            text={"Cena za ubytování"}
            Icon={Bed}
            description={skola.ubytovani.toFixed(1) + " Kč"}
          />
        )}

        {skola.adresa}

        <InfoDetailTile text={"Hodno"} Icon={Heart} description="Adresa" />
        <InfoDetailTile text={"Hodno"} Icon={Heart} description="Adresa" />
        <InfoDetailTile text={"Hodno"} Icon={Heart} description="Adresa" />
        <InfoDetailTile text={"Hodno"} Icon={Heart} description="Adresa" />
      </div>
      <div className="h-6" />
      <Separator />
      <div className="h-6" />
      {skola.podskola.map((podskola, index) => (
        <>
          <PodskolaDetailsTile key={index} podskola={podskola} />
          {index < skola.podskola.length - 1 && (
            <>
              <div className="h-6" />
              <Separator />
              <div className="h-6" />
            </>
          )}
        </>
      ))}
      <div className="h-2" />
      <Separator />
      <div className="h-6" />
    </div>
  );
}
