import { SkolaZakladniMaterskaType } from "@/actions/types/skolkaZakladkaAllData";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { vzdalenostInKmFunc } from "@/helpers/address-to-text";
import { Colors } from "@/lib/colors";
import { useStore } from "@/state/useStore";
import {
  Crown,
  Heart,
  Mail,
  Route,
  Speech,
  Star,
  UserRound,
} from "lucide-react";
import InfoDetailTile from "../generic/InfoDetailTile";
import HodnoceniSection from "./HodnoceniSection";
import OboryDetailsTile from "./OboryDetailsTile";
import ZarizeniDetailsTile from "./ZarizeniDetailsTile";

interface SkolaZakladniMaterskaProps {
  skola: SkolaZakladniMaterskaType;
}

export default function SkolaZakladniMaterskaDetail({
  skola,
}: SkolaZakladniMaterskaProps) {
  const favouriteZakladniMaterske = useStore((state) =>
    state.filter.getFavouritesMaterskeSkoly()
  );
  const isFavourite = favouriteZakladniMaterske
    .map((skola) => skola.id)
    .some((id) => id === skola.id);

  const setFavourite = useStore((state) => state.filter.setFavourite);

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
              ? setFavourite([...favouriteZakladniMaterske, skola])
              : setFavourite(
                  favouriteZakladniMaterske.filter((fav) => fav.id !== skola.id)
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
        {skola.prumer_hvezdicek && (
          <InfoDetailTile
            text={"Hodnocení"}
            Icon={Star}
            description={(skola.prumer_hvezdicek / -10).toFixed(1) + " / 5"}
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

        {/*TODO: Missing data in requests*/}
        {skola.typ_zrizovatele?.nazev && (
          <InfoDetailTile
            text={"Typ zřizovatele"}
            Icon={Crown}
            description={skola.typ_zrizovatele.nazev}
          />
        )}

        {skola.jazyk?.nazev && (
          <InfoDetailTile
            text={"Jazyk"}
            Icon={Speech}
            description={skola.jazyk?.nazev}
          />
        )}

        {skola.reditelemail && (
          <InfoDetailTile
            text={"Email ředitele/ky"}
            Icon={Mail}
            description={skola.reditelemail}
          />
        )}
      </div>
      <div className="h-6" />
      <Separator />
      <div className="h-6" />
      {skola.zarizeni_skolky_zakladky.length > 0 && (
        <>
          <ZarizeniDetailsTile podskola={skola.zarizeni_skolky_zakladky} />
          <div className="h-6" />
        </>
      )}

      {skola.obor_skolky_zakladky.length > 0 && (
        <>
          <OboryDetailsTile obory={skola.obor_skolky_zakladky} />
          <div className="h-6" />
        </>
      )}

      <div className="h-2" />
      <Separator />
      <div className="h-6" />
      <HodnoceniSection hodnoceni={skola.hodnoceni} skolaId={skola.id} />
      <div className="h-6" />
      <Separator />
      <div className="h-6" />
    </div>
  );
}
