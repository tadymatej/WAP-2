"use server"

import { db } from "@/lib/db";
import { AdresaFilterModel } from "./filterModels/adresaFilterModel";

export async function getAdresaList(filter : AdresaFilterModel) {
  return await db.adresa.findMany({
    where: {
      id: filter.IDs.length == 0 ? undefined : {
        in: filter.IDs
      },
      skolaid: filter.skolaIDs.length == 0 ? undefined : {
        in: filter.skolaIDs
      }
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