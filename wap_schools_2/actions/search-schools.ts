"use server";

import { db } from "@/lib/db";
import { FilterStateDefinition, SkolySortType } from "@/state/types";
import { Prisma } from "@prisma/client";

interface OptionsBasedOnTypeAndSearchInputProps {
  filterState: FilterStateDefinition;
}

//Derive type from searchingForSchools
export type UsersWithPosts = Prisma.PromiseReturnType<
  typeof searchingForSchools
>;

export async function searchingForSchools({
  filterState,
}: OptionsBasedOnTypeAndSearchInputProps) {
  const sortBy = filterState.sortBy;
  console.log("Searching for schools");
  return await db.skola.findMany({
    where: {
      adresa: {
        some: {
          obec: {
            id: {
              in:
                filterState.mestaSelected.length == 0
                  ? undefined
                  : filterState.mestaSelected.map((m) => m.id),
            },
            okres: {
              id: {
                in:
                  filterState.okresySelected.length == 0
                    ? undefined
                    : filterState.okresySelected.map((o) => o.id),
              },
              kraj: {
                id: {
                  in:
                    filterState.krajeSelected.length == 0
                      ? undefined
                      : filterState.krajeSelected.map((k) => k.id),
                },
              },
            },
          },
        },
      },
      podskola: {
        some: {
          obor: {
            some: {
              id: {
                in:
                  filterState.vyucovaneOborySelected.length == 0
                    ? undefined
                    : filterState.vyucovaneOborySelected.map((o) => o.id),
              },
            },
          },
        },
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
      skola_vyucovanyjazyk: true,
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
          obor: {
            select: {
              minulyrokprihlaseno: true,
              minulyrokprijato: true,
              nazevoboru: true,
              obor_prijimacizkouska: {
                select: {
                  obor: {
                    select: {
                      nazevoboru: true,
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
    take: 50,
  });
}
