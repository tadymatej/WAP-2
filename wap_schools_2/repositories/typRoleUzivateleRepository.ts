"use server";

import { db } from "@/lib/db";
import { TypRoleUzivateleFilterModel } from "./filterModels/typRoleUzivateleFilterModel";

export async function getTypRoleUzivateleiList(filter : TypRoleUzivateleFilterModel): Promise<TypRoleUzivateleModel[]> {
    const res = await db.typ_role_uzivatele.findMany({
      where: {
        id: filter.ID
      },
      select: {
        id: true,
        nazev: true,
      },
      orderBy: {
        nazev: "asc",
      },
      take: 50
    });
    return res.map((r) => ({
      ID: r.id,
      nazev: r.nazev
    }));
}

