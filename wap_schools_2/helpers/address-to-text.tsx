import { SkolaVysokaStredniAdresaType } from "@/actions/types/skolaVysokaStredniType";

export const addressToText = (adress: SkolaVysokaStredniAdresaType) => {
  //ulice + cislo domovni + '/' + cislo orientacni + psc + mestska cast | cast obce + mesto/obec
  //- mestska cast se muze == mesto/obec

  if (!adress) return "";

  let text = "";
  if (adress.ulice) {
    text += adress.ulice;
  }
  if (adress.cislodomovni) {
    text += " " + adress.cislodomovni;
  }
  if (adress.cisloorientacni) {
    text += "/" + adress.cisloorientacni;
  }
  if (adress.psc) {
    text += ", " + adress.psc;
  }
  if (adress.mestska_cast_obvod?.nazev) {
    text += ", " + adress.mestska_cast_obvod.nazev;
  }
  if (adress.cast_obce?.nazev) {
    text += ", " + adress.cast_obce.nazev;
  }
  if (adress.obec?.nazev && adress.cast_obce?.nazev !== adress.obec.nazev) {
    text += ", " + adress.obec.nazev;
  }

  return text;
};

export const vzdalenostInKmFunc = ({
  userLatitude,
  userLongitude,
  goalLatitude,
  goalLongitude,
}: {
  userLatitude: number | undefined;
  userLongitude: number | undefined;
  goalLatitude: number | undefined;
  goalLongitude: number | undefined;
}) => {
  if (!userLatitude || !userLongitude || !goalLatitude || !goalLongitude) {
    return null;
  }
  //acos(sin(lat1)sin(lat2)+cos(lat1)cos(lat2)cos(lon2-lon1))6371 (6371 is Earth radius in km.)
  const lat1 = (userLatitude * Math.PI) / 180;
  const lat2 = (goalLatitude * Math.PI) / 180;
  const lon1 = (userLongitude * Math.PI) / 180;
  const lon2 = (goalLongitude * Math.PI) / 180;
  const distance =
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    ) * 6371;
  return distance;
};
