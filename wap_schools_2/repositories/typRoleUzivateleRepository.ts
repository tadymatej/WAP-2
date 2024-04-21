"use server";

import { db } from "@/lib/db";
import { TypRoleUzivateleFilterModel } from "./filterModels/typRoleUzivateleFilterModel";

/**
 * Gets typ_role_uzivatele list
 * @param filter typ_role_uzivatele filter options
 */
export async function getTypRoleUzivateleiList(filter : TypRoleUzivateleFilterModel) {
    return await db.typ_role_uzivatele.findMany({
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
}

