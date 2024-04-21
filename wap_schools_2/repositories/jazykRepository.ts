import { JazykFilterModel } from "./filterModels/jazykFilterModel";
import { db } from "@/lib/db";

export async function getJazykList(filter : JazykFilterModel) {
  return await db.skola.findFirst({
    where: {
      id: filter.skolaID
    },
    select: {
      skola_vyucovanyjazyk: {
        select: {
          jazyk: {
            select: {
              nazev: true
            }
          }
        }
      }
    }
  })
}