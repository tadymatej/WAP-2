"use server";

import { db } from "@/lib/db";
import { HodnoceniFilterModel } from "./filterModels/hodnoceniFilterModel";

export async function getHodnoceniList(filter: HodnoceniFilterModel) {
  const res = await db.hodnoceni.findMany({
    where: {
      id: filter.ID,
      skolaid:
        filter.skolaIDs.length == 0
          ? undefined
          : {
              in: filter.skolaIDs,
            },
      skolkazakladkaid:
        filter.skolkaZakladkaIDs.length == 0
          ? undefined
          : {
              in: filter.skolkaZakladkaIDs,
            },
    },
    select: {
      id: true,
      popis: true,
      autor: true,
      hvezdicek: true,
      jinaroleuzivatele: true,
      typroleuzivateleid: true,
      typ_role_uzivatele: {
        select: {
          id: true,
          nazev: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    take: filter.limit,
    skip: filter.offset,
  });
  return res;
}

export async function getHodnoceni(filter: HodnoceniFilterModel) {
  const res = await db.hodnoceni.findFirst({
    where: {
      id: filter.ID,
      skolaid:
        filter.skolaIDs.length == 0
          ? undefined
          : {
              in: filter.skolaIDs,
            },
      skolkazakladkaid:
        filter.skolkaZakladkaIDs.length == 0
          ? undefined
          : {
              in: filter.skolkaZakladkaIDs,
            },
    },
    select: {
      id: true,
      popis: true,
      autor: true,
      hvezdicek: true,
      jinaroleuzivatele: true,
      typroleuzivateleid: true,
      typ_role_uzivatele: {
        select: {
          id: true,
          nazev: true,
        },
      },
    },
  });
  return res;
}

//export async function insertHodnoceni(
//  model: hodnoceni
//): Promise<boolean> {
//  try {
//    const res = await db.hodnoceni.create({
//      data: {
//        popis: model.popis,
//        autor: model.autor,
//        hvezdicek: model.hvezdicek,
//        jinaroleuzivatele: model.jinaRoleUzivatele,
//        typroleuzivateleid: model.typRoleUzivatele?.ID,
//      },
//    });
//  } catch (e) {
//    console.log(model);
//    if (e instanceof Prisma.PrismaClientKnownRequestError) {
//    }
//    return false;
//  }
//  return true;
//}
