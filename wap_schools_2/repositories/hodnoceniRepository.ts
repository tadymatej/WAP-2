"use server";

import { db } from "@/lib/db";
import { HodnoceniModel } from "./models/hodnoceniModel";
import { HodnoceniFilterModel } from './filterModels/hodnoceniFilterModel';
import { Prisma } from "@prisma/client";

export async function getHodnoceniList(filter : HodnoceniFilterModel): Promise<HodnoceniModel[]> {
    const res = await db.hodnoceni.findMany({
      where: {
        id: filter.ID,
        skolaid: filter.skolaID,
        skolkazakladkaid: filter.skolkaZakladkaID
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
            nazev: true
          }
        }
      },
      orderBy: {
        id: "desc",
      },
      take: 50
    });
    return res.map((r) => ({
      ID: r.id,
      popis: r.popis,
      autor: r.autor,
      //TODO: odstranit pocet hvezdicek
      hvezdicek: r.hvezdicek == null ? 0 : r.hvezdicek,
      jinaRoleUzivatele: r.jinaroleuzivatele,
      typRoleUzivatele: {
        ID: r.typroleuzivateleid,
        nazev: r.typ_role_uzivatele?.nazev
      }
    }));
}

export async function getHodnoceni(filter : HodnoceniFilterModel) : Promise<HodnoceniModel | null> {
  const res = await db.hodnoceni.findFirst({
    where: {
      id: filter.ID,
      skolaid: filter.skolaID,
      skolkazakladkaid: filter.skolkaZakladkaID
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
          nazev: true
        }
      }
    }
  })
  if(res == null) return null;
  return {
    ID: res.id,
    popis: res.popis,
    autor: res.autor,
    //TODO: odstranit pocet hvezdicek
    hvezdicek: res.hvezdicek == null ? 0 : res.hvezdicek,
    jinaRoleUzivatele: res.jinaroleuzivatele,
    typRoleUzivatele: {
      ID: res.typroleuzivateleid,
      nazev: res.typ_role_uzivatele?.nazev
    }
  }
}

export async function insertHodnoceni(model : HodnoceniModel) : Promise<boolean> {
  try {
    const res = await db.hodnoceni.create({
      data: {
        popis: model.popis,
        autor: model.autor,
        hvezdicek: model.hvezdicek,
        jinaroleuzivatele: model.jinaRoleUzivatele,
        typroleuzivateleid: model.typRoleUzivatele?.ID
      }
    })
  } 
  catch (e) {
    console.log(model)
    if (e instanceof Prisma.PrismaClientKnownRequestError) { 

    }
    return false;
  }
  return true;
}