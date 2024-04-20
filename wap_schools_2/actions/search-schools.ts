"use server";

import { db } from "@/lib/db";
import { FilterStateDefinition, SkolySortType } from "@/state/types";
import { Prisma } from "@prisma/client";

interface OptionsBasedOnTypeAndSearchInputProps {
  filterState: FilterStateDefinition;
}

export type SkolaVysokaStredniType = SkolaVysokaStredniList extends (infer T)[]
  ? T
  : never;

export type SkolaVysokaStredniAdresaType = SkolaVysokaStredniType["adresa"];

export type SkolaVysokaStredniPodskolaType =
  SkolaVysokaStredniType["podskola"] extends (infer T)[] ? T : never;
//Derive type from searchingForSchools
export type SkolaVysokaStredniList = Prisma.PromiseReturnType<
  typeof searchingForSchools
>;

export async function searchingForSchools({
  filterState,
}: OptionsBasedOnTypeAndSearchInputProps) {
  const sortBy = filterState.sortBy;
  console.log("Searching for schools");
  const listIds = [1, 2, 3, 4, 5];
  return await db.skola.findMany({
    where: {
      id: {
        in: listIds,
      },
    },
    select: {
      adresa: {
        select: {
          obec: {
            select: {
              nazev: true,
              okres: {
                select: {
                  nazev: true,
                  kraj: {
                    select: {
                      nazev: true,
                    },
                  },
                },
              },
            },
          },
          cislodomovni: true,
          cisloorientacni: true,
          psc: true,
          ulice: true,
          kodadresnihomista: false,
          mestskacastobvodid: false,
          mestska_cast_obvod: {
            select: {
              nazev: true,
            },
          },
        },
      },

      typ_skoly: {
        select: {
          nazev: true,
        },
      },
      reditel: true,
      rediteltel: true,
      nazev: true,
      skola_vyucovanyjazyk: {
        select: {
          jazyk: {
            select: {
              nazev: true,
            },
          },
        },
      },
      url: true,
      typ_zrizovatele: {
        select: {
          nazev: true,
        },
      },
      email: true,
      kontaktniosoba: true,
      kontaktniosobatel: true,
      poznamka: true,
      ubytovani: true,
      stravovani: true,
      id: true,

      podskola: {
        select: {
          druh_podskoly: {
            select: {
              nazev: true,
            },
          },
          obor: {
            select: {
              minulyrokprihlaseno: true,
              minulyrokprijato: true,
              nazevoboru: true,
              obor_prijimacizkouska: {
                select: {
                  prijimaci_zkouska: {
                    select: {
                      nazev: true,
                    },
                  },
                },
              },

              obor_vhodnostprozaky: {
                select: {
                  vhodnost_pro_zaky: {
                    select: {
                      nazev: true,
                    },
                  },
                },
              },
              povinnalekarskaprohlidka: true,
              skolne: true,
              prospech: true,
              stupen_vzdelani: {
                select: {
                  nazev: true,
                },
              },
              ukonceni_studia: {
                select: {
                  nazev: true,
                },
              },
              vhodneprozakyozp: true,

              aktualnirokprijmou: true,
              delkastudia: true,
              druh_studia: {
                select: {
                  nazev: true,
                },
              },
              forma_studia: {
                select: {
                  nazev: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      nazev: sortBy === SkolySortType.Nazev ? "asc" : undefined,
    },
    take: 20,
  });
}
