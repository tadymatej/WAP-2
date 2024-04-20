export interface SchoolAllData {
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
    obor:
      | {
          minulyrokprihlaseno: number | null;
          minulyrokprijato: number | null;
          nazevoboru: string | null;
          povinnalekarskaprohlidka: boolean | null;
          skolne: number | null;
          prospech: number | null;
          vhodneprozakyozp: boolean | null;
          aktualnirokprijmou: number | null;
          delkastudia: number | null;
          obor_prijimacizkouska:
            | {
                obor: {
                  nazevoboru: string | null;
                } | null;
              }[]
            | null;
          obor_vhodnostprozaky:
            | {
                vhodnost_pro_zaky: {
                  nazev: string | null;
                } | null;
              }[]
            | null;
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
        }[]
      | null;
  } | null;
}

export const schools: SchoolAllData[] = [
  {
    id: 1,
    nazev: "School 1",
    reditel: "Director 1",
    rediteltel: "123456789",
    url: "http://school1.com",
    email: "school1@example.com",
    kontaktniosoba: "Contact 1",
    kontaktniosobatel: "987654321",
    poznamka: "Note 1",
    ubytovani: 1,
    stravovani: 1,
    skola_vyucovanyjazyk: true,
    adresa: {
      cislodomovni: 1,
      cisloorientacni: "1A",
      psc: "10000",
      ulice: "Street 1",
      obec: {
        nazev: "City 1",
        okres: {
          nazev: "District 1",
          kraj: {
            nazev: "Region 1",
          },
        },
      },
      mestska_cast_obvod: {
        nazev: "Municipality 1",
      },
    },
    typ_skoly: {
      nazev: "Type 1",
    },
    typ_zrizovatele: {
      nazev: "Founder Type 1",
    },
    podskola: {
      obor: [
        {
          minulyrokprihlaseno: 100,
          minulyrokprijato: 80,
          nazevoboru: "Course 1",
          povinnalekarskaprohlidka: true,
          skolne: 5000,
          prospech: 1.5,
          vhodneprozakyozp: true,
          aktualnirokprijmou: 120,
          delkastudia: 4,
          obor_prijimacizkouska: [
            {
              obor: {
                nazevoboru: "Course 1",
              },
            },
          ],
          obor_vhodnostprozaky: [
            {
              vhodnost_pro_zaky: {
                nazev: "Suitability 1",
              },
            },
          ],
          stupen_vzdelani: {
            nazev: "Level 1",
          },
          ukonceni_studia: {
            nazev: "Graduation 1",
          },
          druh_studia: {
            nazev: "Study Type 1",
          },
          forma_studia: {
            nazev: "Study Form 1",
          },
        },
      ],
    },
  },
  // More schools...
];
