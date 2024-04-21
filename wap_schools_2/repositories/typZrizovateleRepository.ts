import { db } from "@/lib/db";
import { TypZrizovateleFilterModel } from "./filterModels/typZrizovateleFilterModel";


export async function getTypZrizovatele(filter : TypZrizovateleFilterModel) {
  return await db.skola.findFirst({
    where: {
      id: filter.skolaID
    },
    select: {
      typ_zrizovatele: {
        select: {
          nazev: true,
        }
      }
    },
    orderBy: {
      nazev: "asc",
    },
  });
}