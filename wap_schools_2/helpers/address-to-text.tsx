import { SkolaVysokaStredniAdresaType } from "@/actions/types/skolaVysokaStredniAllData";

export const addressToText = (adress: SkolaVysokaStredniAdresaType) => {
  //ulice + cislo domovni + '/' + cislo orientacni + psc + mestska cast | cast obce + mesto/obec
  //- mestska cast se muze == mesto/obec

  console.log("Adresa", adress);

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

  console.log("Adresa text", text);

  return text;
};
