import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addressToText, vzdalenostInKmFunc } from "@/helpers/address-to-text";
import { Colors } from "@/lib/colors";
import { useStore } from "@/state/useStore";
import {
  Bed,
  CookingPot,
  Crown,
  Heart,
  LinkIcon,
  LocateFixed,
  Mail,
  Notebook,
  Phone,
  Route,
  Speech,
  Star,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import DotInfoTile from "../generic/DotInfoTile";
import InfoDetailTile from "../generic/InfoDetailTile";
import HodnoceniSection from "./HodnoceniSection";
import LocationSection from "./LocationSection";
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

  const favouriteMaterskeZakladni = useStore((state) =>
    state.filter.getFavouritesMaterskeSkoly()
  );

  const isFavourite = favouriteVysokeStredni
    .map((skola) => skola.id)
    .some((id) => id === skola.id);

  const setFavourite = useStore((state) => state.filter.setFavourite);
  const vyucovaneJazyky = skola.skola_vyucovanyjazyk
    .map((jazyk) => jazyk.jazyk?.nazev)
    .filter((jazyk) => jazyk !== null && jazyk !== undefined);
  //skola.skola_vyucovanyjazyk
  //  .map((jazyk) => jazyk.jazyk?.nazev)
  //  .filter((jazyk) => jazyk !== null && jazyk !== undefined);

  //acos(sin(lat1)sin(lat2)+cos(lat1)cos(lat2)cos(lon2-lon1))6371 (6371 is Earth radius in km.)
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
              ? setFavourite([
                  ...favouriteVysokeStredni,
                  ...favouriteMaterskeZakladni,
                  skola,
                ])
              : setFavourite([
                  ...favouriteVysokeStredni.filter(
                    (fav) => fav.id !== skola.id
                  ),
                  ...favouriteMaterskeZakladni,
                ])
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
        {skola.hodnoceni.length > 0 && (
          <InfoDetailTile
            text={"Hodnocení"}
            Icon={Star}
            description={
              (
                skola.hodnoceni.reduce((a, b) => a + b.hvezdicek, 0) /
                skola.hodnoceni.length /
                10
              ).toFixed(1) + " / 5"
            }
          />
        )}
        {vzdalenostInKm && (
          <InfoDetailTile
            text={"Vzdálenost od vybrané lokace"}
            Icon={Route}
            description={vzdalenostInKm.toFixed(1) + " km"}
          />
        )}
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

        {skola.poznamka && (
          <InfoDetailTile
            text={"Poznámka"}
            Icon={Notebook}
            description=""
            subtext={skola.poznamka}
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

        {skola.adresa && (
          <InfoDetailTile
            text={"Adresa"}
            Icon={LocateFixed}
            description={addressToText(skola.adresa)}
          />
        )}

        {skola.url && (
          <Link href={skola.url}>
            <InfoDetailTile
              text={"URL"}
              Icon={LinkIcon}
              description={skola.url}
            />
          </Link>
        )}
        {/*TODO: Missing data in requests*/}
        {skola.typ_zrizovatele?.nazev && (
          <InfoDetailTile
            text={"Typ zřizovatele"}
            Icon={Crown}
            description={skola.typ_zrizovatele.nazev}
          />
        )}

        {vyucovaneJazyky.length > 0 && (
          <div className="flex flex-col">
            <InfoDetailTile
              text={"Vyučované jazyky"}
              Icon={Speech}
              description={""}
            />
            <div className="h-2" />
            <div className="pl-8 flex flex-wrap gap-x-4 gap-y-4">
              {vyucovaneJazyky.map((jazyk) => (
                <DotInfoTile key={jazyk} text={jazyk ?? ""} />
              ))}
            </div>
          </div>
        )}

        {skola.email && (
          <InfoDetailTile
            text={"Email"}
            Icon={Mail}
            description={skola.email}
          />
        )}
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
      <HodnoceniSection hodnoceni={skola.hodnoceni} skolaId={skola.id} />
      <div className="h-6" />
      <Separator />
      <div className="h-6" />
      <LocationSection
        schoolLatitude={goalLatitude}
        schoolLongitude={goalLongitude}
      />
    </div>
  );
}
