

import { db } from "@/lib/db";
import { ZarizeniSkolkyZakladkyFilterModel } from "./filterModels/zarizeniSkolkyZakladkyRepository";

/**
 * Gets zarizeni_skolky_zakladky (and fields from corresponding tables for zarizeni_skolky_zakladky) list for skolka_zakladka
 * @param filter zarizen_skolky_zakladky filter options
 */
export async function getZarizeniSkolkyZakladkyList(filter : ZarizeniSkolkyZakladkyFilterModel) {
  return db.zarizeni_skolky_zakladky.findMany({
    where: {
      id: filter.IDs.length == 0 ? undefined : {
        in : filter.IDs
      },
      skolkazakladkaid: filter.skolkaZakladkaIDs.length == 0 ? undefined : {
        in: filter.skolkaZakladkaIDs
      }
    },
    select: {
      kapacita: true,
      nazev: true,
      zarizeni_druh_typ: {
        select: {
          nazev: true
        } 
      },
      zarizeniskolkyzakladky_adresa: {
        select: {
          adresa: {
            select: {
              cislodomovni: true,
              cisloorientacni: true,
              psc: true,
              ulice: true,
              mestska_cast_obvod: {
                select: {
                  nazev: true
                }
              },
              cast_obce: {
                select: {
                  nazev: true
                }
              },
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
              }
            }
          }
        }
      }
    },
    skip: filter.offset,
    take: filter.limit
  })
}