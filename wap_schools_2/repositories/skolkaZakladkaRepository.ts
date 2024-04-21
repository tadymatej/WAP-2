"use server";

import { SkolaZakladniMaterskaType } from "@/actions/types/skolaZakladniMaterskaType";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import {
  getLimit,
  getOffset,
  whereConditionCastObceIDs,
  whereConditionHodnoceni,
  whereConditionKrajIDs,
  whereConditionMestskaCastIDs,
  whereConditionObecIDs,
  whereConditionOkresIDs,
  whereConditionVzdalenostMax,
} from "./common/rawFunctions";
import { SkolkaZakladkaFilterModel } from "./filterModels/skolkaZakladkaFilterModel";
import {
  SkolkaZakladkaOrderByEnum,
  SkolkaZakladkaOrderByModel,
} from "./orderByTypes/skolkaZakladkaOrderByTypes";

/**
 * Returns SQL part of JOIN clause for joining adresa and its coresponding tables
 * @param filter filter model by which we are filtering 
 * @param order order model by which we are ordering
 * @returns {Prisma.Sql}
 */
function whereJoinAdresa(filter: SkolkaZakladkaFilterModel, order : SkolkaZakladkaOrderByModel) {
  if (
    filter.castObceIDs.length > 0 ||
    filter.krajIDs.length > 0 ||
    filter.mestskaCastIDs.length > 0 ||
    filter.okresIDs.length > 0 || 
    filter.obecIDs.length > 0 || 
    order.type == SkolkaZakladkaOrderByEnum.Location
  )
    return Prisma.sql` 
        LEFT JOIN skolkazakladka_adresa ON skolkazakladka_adresa.SkolkaZakladkaID = skolka_zakladka.ID
        LEFT JOIN adresa ON adresa.ID = skolkazakladka_adresa.AdresaID
        LEFT JOIN obec ON obec.ID = adresa.ObecID
        LEFT JOIN okres ON okres.ID = obec.OkresID
        LEFT JOIN kraj ON kraj.ID = okres.KrajID
      `;
  return Prisma.sql``;
}

/**
 * Returns SQL part of JOIN clause for joining zarizeni
 * @param filter Filter model by which we are filtering
 * @returns {Prisma.Sql}
 */
function whereJoinZarizeni(filter: SkolkaZakladkaFilterModel) {
  if (filter.zarizeniIDs.length > 0)
    return Prisma.sql` LEFT JOIN zarizeni_skolky_zakladky ON zarizeni_skolky_zakladky.SkolkaZakladkaID = skolka_zakladka.ID`;
  return Prisma.empty;
}

/**
 * Returns SQL part of WHERE clause for filtering by zarizeni_skolky_zakladky.IDs
 * @returns {Prisma.Sql}
 */
function whereConditionZarizeniIDs(zarizeniIDs: number[]) {
  if (zarizeniIDs.length > 0) {
    return Prisma.sql` AND zarizeni_skolky_zakladky.ID IN (${Prisma.join(
      zarizeniIDs
    )})`;
  }
  return Prisma.empty;
}

/**
 * Returns SQL part of ORDER BY clause for ordering
 * @param order Order model to set the ordering behaviour
 * @returns {Prisma.Sql}
 */
function getOrderBy(order: SkolkaZakladkaOrderByModel) {
  switch (order.type) {
    case SkolkaZakladkaOrderByEnum.Hodnoceni:
      return Prisma.sql` ORDER BY prumer_hvezdicek`;
    case SkolkaZakladkaOrderByEnum.Location: {
      if (order.lon == null || order.lat == null) throw "Missing coordinates";
      return Prisma.sql` ORDER BY vzdalenost`;
    }
    case SkolkaZakladkaOrderByEnum.Nazev:
      return Prisma.sql` ORDER BY skolka_zakladka.nazev`;
  }
}

/**
 * Returns SQL part of WHERE clause for filtering by skolka_zakladka.Nazev
 * @returns {Prisma.Sql}
 */
function getWhereSkolkaZakladkaNazev(nazev: string | null | undefined) {
  if (nazev != null) {
    return Prisma.sql` AND skolka_zakladka.Nazev LIKE CONCAT('%', ${nazev} ,'%')`;
  }
  return Prisma.sql``;
}

/**
 * Returns SQL part of WHERE clause for filtering by skolka_zakladka.IDs
 * @returns {Prisma.Sql}
 */
function getWhereSkolkaZakladkaIDs(IDs: number[]) {
  if (IDs.length > 0) {
    return Prisma.sql` AND skolka_zakladka.ID IN (${Prisma.join(IDs)})`;
  }
  return Prisma.empty;
}

/**
 * Returns SQL part of WHERE clause for filtering by skolka_zakladka.typZrizovateleID
 * @returns {Prisma.Sql}
 */
function getWhereTypZrizovateleIDs(typZrizovateleIDs: number[]) {
  if (typZrizovateleIDs.length > 0) {
    return Prisma.sql` AND skolka_zakladka.TypZrizovateleID IN (${Prisma.join(
      typZrizovateleIDs
    )})`;
  }
  return Prisma.empty;
}

/**
 * Returns SQL part of WHERE clause for filtering by skolka_zakladka.skolaDruhTypID
 * @returns {Prisma.Sql}
 */
function getWhereSkolaDruhTypIDs(skolaDruhTypIDs: number[]) {
  if (skolaDruhTypIDs.length > 0) {
    return Prisma.sql` AND skolka_zakladka.SkolaDruhTypID IN (${Prisma.join(
      skolaDruhTypIDs
    )})`;
  }
  return Prisma.empty;
}

/**
 * Returns SQL part of WHERE clause for filtering by filterModel
 * @returns {Prisma.Sql}
 */
function getWhere(filter: SkolkaZakladkaFilterModel) {
  if (
    filter.vzdalenostMax != null &&
    (filter.lat == null || filter.lon == null)
  )
    throw "Missing coordinates";
  return Prisma.sql`
    WHERE 
    1 = 1
    ${getWhereSkolkaZakladkaIDs(filter.IDs)} 
    ${getWhereTypZrizovateleIDs(filter.typZrizovateleIDs)}
    ${getWhereSkolaDruhTypIDs(filter.skolaDruhTypIDs)}
    ${getWhereSkolkaZakladkaNazev(filter.nazev)}

    ${whereConditionKrajIDs(filter.krajIDs)}
    ${whereConditionOkresIDs(filter.okresIDs)}
    ${whereConditionObecIDs(filter.obecIDs)}
    ${whereConditionCastObceIDs(filter.castObceIDs)}
    ${whereConditionMestskaCastIDs(filter.mestskaCastIDs)}
    ${whereConditionHodnoceni(filter.hodnoceniRange)}
    ${whereConditionVzdalenostMax(
      filter.vzdalenostMax,
      filter.lat as number,
      filter.lon as number
    )}
    ${whereConditionZarizeniIDs(filter.zarizeniIDs)}
  `;
}

/**
 * Gets all skolka_zakladka datas filtered and sorted by given model
 * @param filter Filter model by which to perform filtering
 * @param order Order model by which to perform ordering
 */
export async function getSkolkaZakladkaList(
  filter: SkolkaZakladkaFilterModel,
  order: SkolkaZakladkaOrderByModel
): Promise<SkolaZakladniMaterskaType[]> {
  let sql = Prisma.empty;
  if (order.type == SkolkaZakladkaOrderByEnum.Location) {
    sql = Prisma.sql`
      SELECT * 
        FROM (
          SELECT DISTINCT
            skolka_zakladka.*,
            -AVG(hodnoceni.hvezdicek) as prumer_hvezdicek,
            POW((adresa.lon - ${order.lon}), 2) + POW((adresa.lat - ${order.lat}), 2) AS vzdalenost,
            adresa.lat,
            adresa.lon
          FROM skolka_zakladka
          LEFT JOIN hodnoceni ON hodnoceni.SkolkaZakladkaID = skolka_zakladka.ID
          ${whereJoinAdresa(filter, order)}
          ${whereJoinZarizeni(filter)}
          ${getWhere(filter)}
          GROUP BY skolka_zakladka.ID, adresa.lat, adresa.lon
          ${getOrderBy(order)}
          ${getLimit(filter.limit)}
          ${getOffset(filter.offset)}
      ) AS helpTable ORDER BY helpTable.vzdalenost
  `;
  } else {
    sql = Prisma.sql`
      SELECT DISTINCT
        -AVG(hodnoceni.hvezdicek) as prumer_hvezdicek,
        skolka_zakladka.*
      FROM skolka_zakladka
      LEFT JOIN hodnoceni ON hodnoceni.SkolkaZakladkaID = skolka_zakladka.ID
      ${whereJoinAdresa(filter, order)}
      ${whereJoinZarizeni(filter)}
      ${getWhere(filter)}
      GROUP BY skolka_zakladka.ID
      ${getOrderBy(order)}
      ${getLimit(filter.limit)}
      ${getOffset(filter.offset)}
      `;
  }
  let res: SkolaZakladniMaterskaType[] = await db.$queryRaw(sql);
  return res;
}
