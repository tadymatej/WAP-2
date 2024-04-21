"use server"

import { db } from "@/lib/db"
import { OborFilterModel } from "./filterModels/oborFilterModel"

/**
 * Gets obor (and fields from corresponding tables for obor) list for podskola
 * @param filter obor filter options
 */
export async function getOborList(filter : OborFilterModel) {
  return await db.obor.findMany({
    where: {
      id: filter.IDs.length == 0 ? undefined : {
        in: filter.IDs
      },
      podskolaid: filter.podskolaIDs.length == 0 ? undefined : {
        in: filter.podskolaIDs
      }
    },
    select: {
      minulyrokprihlaseno: true,
      minulyrokprijato: true,
      nazevoboru: true,
      povinnalekarskaprohlidka: true,
      skolne: true,
      prospech: true,
      vhodneprozakyozp: true,
      aktualnirokprijmou: true,
      aktualniskolnirok: true,
      delkastudia: true,
      obor_prijimacizkouska: {
        select: {
          prijimaci_zkouska: {
            select: {
              nazev: true
            }
          }
        }
      },
      obor_vhodnostprozaky: {
        select: {
          vhodnost_pro_zaky: {
            select: {
              nazev: true
            }
          }
        }
      },
      stupen_vzdelani: {
        select: {
          nazev: true
        }
      },
      ukonceni_studia: {
        select: {
          nazev: true
        }
      },
      druh_studia: {
        select: {
          nazev: true
        }
      },
      forma_studia: {
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
  })
}