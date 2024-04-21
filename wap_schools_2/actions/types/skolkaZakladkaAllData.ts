export type SkolaZakladniMaterskaZarizeniType =
  SkolaZakladniMaterskaType["zarizeni_skolky_zakladky"] extends (infer T)[]
    ? T
    : never;
export type SkolaZakladniMaterskaOboryType =
  SkolaZakladniMaterskaType["obor_skolky_zakladky"] extends (infer T)[]
    ? T
    : never;

export type SkolaZakladniMaterskaHodnoceniType =
  SkolaZakladniMaterskaType["hodnoceni"] extends (infer T)[] ? T : never;

export interface SkolaZakladniMaterskaType {
  id: number;
  datumzahajeni: Date | null;
  prumer_hvezdicek: number;
  lat?: number;
  lon?: number;
  jazyk: {
    nazev: string | null;
  } | null;
  hodnoceni: {
    hvezdicek: number;
    popis: string | null;
    jina_role: string | null;
    autor: string | null;
    role_uzivatele_typy: {
      nazev: string;
    } | null;
  }[];
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
        cislodomovni: number | null;
        cisloorientacni: string | null;
        psc: string | null;
        ulice: string | null;
        cast_obce: {
          nazev: string | null;
        } | null;

        obec: {
          nazev: string | null;
          okres: {
            nazev: string | null;
            kraj: {
              nazev: string | null;
            } | null;
          } | null;
        } | null;
        mestska_cast_obvod: {
          nazev: string | null;
        } | null;
      } | null;
    }[];
  }[];
  zkracenynazev: string | null;
  skolkazakladka_adresa: {
    adresa: {
      cislodomovni: number | null;
      cisloorientacni: string | null;
      psc: string | null;
      ulice: string | null;
      cast_obce: {
        nazev: string | null;
      } | null;

      obec: {
        nazev: string | null;
        okres: {
          nazev: string | null;
          kraj: {
            nazev: string | null;
          } | null;
        } | null;
      } | null;
      mestska_cast_obvod: {
        nazev: string | null;
      } | null;
    } | null;
  }[];
}
