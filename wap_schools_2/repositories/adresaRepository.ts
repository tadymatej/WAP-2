"use server"

import { db } from "@/lib/db";
import { AdresaFilterModel } from "./filterModels/adresaFilterModel";

/**
 * Gets adresa (and fields from corresponding tables for adresa) list for skolka_zakladka
 * @param filter adresa filter options
 */
async function getAdresaSkolkaZakladkaList(filter : AdresaFilterModel) {
  return (await db.skolkazakladka_adresa.findMany({
    where: {
      skolkazakladkaid: filter.skolkaZakladkaIDs.length == 0 ? undefined : {
        in : filter.skolkaZakladkaIDs
      },
      adresaid: filter.IDs.length == 0 ? undefined : {
        in: filter.IDs
      }
    },
    select: {

      adresa: {
        select: {
          skolkazakladka_adresa: {
            select: {
              adresa: {
                select: {
                  id: true,
                  ulice: true,
                  cislodomovni: true,
                  cisloorientacni: true,
                  psc: true,
                  obec: { select: { nazev: true } },
                  mestska_cast_obvod: { select: { nazev: true } },
                  cast_obce: { select: { nazev: true } },
                }
              }
            }
          },
        }
      },      
    }
  })).map((a) => a.adresa);
}

/**
 * Gets adresa (and fields from corresponding tables for adresa) list for skola
 * @param filter adresa filter options
 */
export async function getAdresaList(filter : AdresaFilterModel) {
  if(filter.skolkaZakladkaIDs.length > 0) return getAdresaSkolkaZakladkaList(filter);
  return await db.adresa.findMany({
    where: {
      id: filter.IDs.length == 0 ? undefined : {
        in: filter.IDs
      },
      skolaid: filter.skolaIDs.length == 0 ? undefined : {
        in: filter.skolaIDs
      },
    },
    select: {
      id: true,
      ulice: true,
      cislodomovni: true,
      cisloorientacni: true,
      psc: true,
      obec: {
        select: {
          nazev: true,
          okres: {
            select: {
              nazev: true,
              kraj: {
                select: {
                  nazev: true
                }
              }
            }
          }
        }
      },
      mestska_cast_obvod: {
        select: {
          nazev: true
        }
      },
      cast_obce: {
        select: {
          nazev: true
        }
      }

    },
    orderBy: {
      id: "desc",
    },
    skip: filter.offset,
    take: filter.limit
  });
}