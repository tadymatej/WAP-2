//"use server";

//import { db } from "@/lib/db";
//import { FilterStateDefinition, SkolySortType } from "@/state/types";
//import { Prisma } from "@prisma/client";

//interface OptionsBasedOnTypeAndSearchInputProps {
//  filterState: FilterStateDefinition;
//}

//export type SkolaZakladniMaterskaType =
//  SkolaZakladniMaterskaList extends (infer T)[] ? T : never;

////Derive type from searchingForSchools
//export type SkolaZakladniMaterskaList = Prisma.PromiseReturnType<
//  typeof searchingZakladniForSchools
//>;

//export async function searchingZakladniForSchools({
//  filterState,
//}: OptionsBasedOnTypeAndSearchInputProps) {
//  const sortBy = filterState.sortBy;
//  console.log("Searching for schools");
//  return await db.skolka_zakladka.findMany({
//    where: {},

//    select: {
//      datumzahajeni: true,

//      jazyk: {
//        select: {
//          nazev: true,
//        },
//      },
//      kapacita: true,
//      obor_skolky_zakladky: {
//        select: {
//          obordobihajici: true,
//          delkavzdelavani: true,
//          jazyk: {
//            select: {
//              nazev: true,
//            },
//          },
//          kapacita: true,
//          nazev: true,
//        },
//      },

//      nazev: true,
//      reditel: true,
//      reditelemail: true,
//      skola_druh_typ: {
//        select: {
//          nazev: true,
//        },
//      },
//      typ_zrizovatele: {
//        select: {
//          nazev: true,
//        },
//      },
//      zarizeni_skolky_zakladky: {
//        select: {
//          kapacita: true,
//          nazev: true,

//          zarizeni_druh_typ: {
//            select: {
//              nazev: true,
//            },
//          },
//          zarizeniskolkyzakladky_adresa: {
//            select: {
//              adresa: {
//                select: {
//                  obec: {
//                    select: {
//                      nazev: true,
//                      okres: {
//                        select: {
//                          nazev: true,
//                          kraj: {
//                            select: {
//                              nazev: true,
//                            },
//                          },
//                        },
//                      },
//                    },
//                  },
//                  cislodomovni: true,
//                  cisloorientacni: true,
//                  psc: true,
//                  ulice: true,
//                  kodadresnihomista: false,
//                  mestskacastobvodid: false,
//                  mestska_cast_obvod: {
//                    select: {
//                      nazev: true,
//                    },
//                  },
//                },
//              },
//            },
//          },
//        },
//      },

//      zkracenynazev: true,

//      skolkazakladka_adresa: {
//        select: {
//          adresa: {
//            select: {
//              obec: {
//                select: {
//                  nazev: true,
//                  okres: {
//                    select: {
//                      nazev: true,
//                      kraj: {
//                        select: {
//                          nazev: true,
//                        },
//                      },
//                    },
//                  },
//                },
//              },
//              cislodomovni: true,
//              cisloorientacni: true,
//              psc: true,
//              ulice: true,
//              kodadresnihomista: false,
//              mestskacastobvodid: false,
//              mestska_cast_obvod: {
//                select: {
//                  nazev: true,
//                },
//              },
//            },
//          },
//        },
//      },
//    },

//    orderBy: {
//      nazev: sortBy === SkolySortType.Nazev ? "asc" : undefined,
//    },
//    take: 50,
//  });
//}
