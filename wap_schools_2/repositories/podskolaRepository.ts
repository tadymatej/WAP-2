"use server"

import { db } from "@/lib/db";
import { PodskolaFilterModel } from "./filterModels/podskolaFilterModel";

export async function getPodskolaList(filter : PodskolaFilterModel) {
  return await db.podskola.findMany({
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
      izo: true,
      obor: {
        select: {
          id: true
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