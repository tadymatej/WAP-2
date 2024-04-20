
import { db } from "@/lib/db";
import { OborSkolkyZakladkyFilterModel } from "./filterModels/oborSkolkyZakladkyFilterModel";


export async function getOborSkolkyZakladkyList(filter : OborSkolkyZakladkyFilterModel) {
  return await db.obor_skolky_zakladky.findMany({
    where: {
      id: filter.IDs.length == 0 ? undefined : {
        in : filter.IDs
      },
      skolkazakladkaid: filter.skolkaZakladkaIDs.length == 0 ? undefined : {
        in: filter.skolkaZakladkaIDs
      }
    },
    select: {
      obordobihajici: true,
      delkavzdelavani: true,
      kapacita: true,
      nazev: true,
      jazyk: {
        select: {
          nazev: true
        }
      }
    },
    skip: filter.offset,
    take: filter.limit
  })
}