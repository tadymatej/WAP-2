export interface SkolaZakladniMaterskaType {
  id: number;
  datumzahajeni: Date | null;
  prumer_hvezdicek: number;
  vzdalenost?: number;
  jazyk: {
    nazev: string | null;
  } | null;
  kapacita: number | null;
  obor_skolky_zakladky: {
    obordobihajici: boolean | null;
    delkavzdelavani: number | null;
    jazyk: {
      nazev: string | null;
    } | null;
    kapacita: number | null;
    nazev: string | null;
  }[];
  nazev: string | null;
  reditel: string | null;
  reditelemail: string | null;
  skola_druh_typ: {
    nazev: string | null;
  } | null;
  typ_zrizovatele: {
    nazev: string | null;
  } | null;
  zarizeni_skolky_zakladky: {
    kapacita: number | null;
    nazev: string | null;
    zarizeni_druh_typ: {
      nazev: string | null;
    } | null;
    zarizeniskolkyzakladky_adresa: {
      adresa: {
        obec: {
          nazev: string | null;
          okres: {
            nazev: string | null;
            kraj: {
              nazev: string | null;
            } | null;
          } | null;
        } | null;
        cislodomovni: number | null;
        cisloorientacni: string | null;
        psc: string | null;
        ulice: string | null;
        mestska_cast_obvod: {
          nazev: string | null;
        } | null;
      } | null;
    }[];
  }[];
  zkracenynazev: string | null;
  skolkazakladka_adresa: {
    adresa: {
      obec: {
        nazev: string | null;
        okres: {
          nazev: string | null;
          kraj: {
            nazev: string | null;
          } | null;
        } | null;
      } | null;
      cislodomovni: number | null;
      cisloorientacni: string | null;
      psc: string | null;
      ulice: string | null;
      mestska_cast_obvod: {
        nazev: string | null;
      } | null;
    } | null;
  }[];
}
