import { SkolaVysokaStredniAdresaType } from "@/actions/types/skolaVysokaStredniAllData";

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
  if (adress.mestska_cast_obvod) {
    text += ", " + adress.mestska_cast_obvod.nazev;
  }
  if (adress.cast_obce && adress.mestska_cast_obvod == adress.cast_obce) {
    text += ", " + adress.cast_obce.nazev;
  }
};
