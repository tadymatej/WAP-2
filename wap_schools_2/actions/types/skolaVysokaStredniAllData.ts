
export interface SkolaVysokaStredniAllData {
  id: number;
  nazev: string | null;
  reditel: string | null;
  rediteltel: string | null;
  url: string | null;
  email: string | null;
  kontaktniosoba: string | null;
  kontaktniosobatel: string | null;
  poznamka: string | null;
  ubytovani: number | null;
  stravovani: number | null;
  skola_vyucovanyjazyk: boolean;
  hodnoceni: {
    hvezdicek: number;
    popis: string | null;
    jina_role: string | null;
    autor: string | null;
    role_uzivatele_typy: {
      nazev: string;
    } | null;
  }[];
  adresa: {
    cislodomovni: number | null;
    cisloorientacni: string | null;
    psc: string | null;
    ulice: string | null;
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
  typ_skoly: {
    nazev: string | null;
  } | null;
  typ_zrizovatele: {
    nazev: string | null;
  } | null;
  podskola: {
    obor: {
      minulyrokprihlaseno: number | null;
      minulyrokprijato: number | null;
      nazevoboru: string | null;
      povinnalekarskaprohlidka: boolean | null;
      skolne: number | null;
      prospech: number | null;
      vhodneprozakyozp: boolean | null;
      aktualnirokprijmou: number | null;
      delkastudia: number | null;
      obor_prijimacizkouska: {
        obor: {
          nazevoboru: string | null;
        } | null;
      }[];
      obor_vhodnostprozaky: {
        vhodnost_pro_zaky: {
          nazev: string | null;
        } | null;
      }[];
      stupen_vzdelani: {
        nazev: string | null;
      } | null;
      ukonceni_studia: {
        nazev: string | null;
      } | null;
      druh_studia: {
        nazev: string | null;
      } | null;
      forma_studia: {
        nazev: string | null;
      } | null;
    }[];
  }[];
}