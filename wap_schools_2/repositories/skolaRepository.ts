"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { FilterItemRange } from "./filterModels/filterItems/filterItemRange";
import { SkolaFilterModel } from "./filterModels/skolaFilterModel";
import {
  SkolaOrderByEnum,
  SkolaOrderByModel,
} from "./orderByTypes/skolaOrderByTypes";

import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
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

/**
 * Returns SQL part of ORDER BY clause for ordering
 * @param order Order model to set the ordering behaviour
 * @returns {Prisma.Sql}
 */
function getOrderBy(order: SkolaOrderByModel) {
  switch (order.type) {
    case SkolaOrderByEnum.Hodnoceni:
      return Prisma.sql` ORDER BY prumer_hvezdicek`;
    case SkolaOrderByEnum.Location: {
      if (order.lon == null || order.lat == null) throw "Missing coordinates";
      return Prisma.sql` ORDER BY vzdalenost `;
    }
    case SkolaOrderByEnum.Nazev:
      return Prisma.sql` ORDER BY skola.nazev`;
  }
}

/**
 * Returns SQL part of JOIN clause for joining adresa and its corresponding tables
 * @returns {Prisma.Sql}
 */
function whereJoinAdresa(filter: SkolaFilterModel, order : SkolaOrderByModel) {
  if (
    filter.castObceIDs.length > 0 ||
    filter.krajIDs.length > 0 ||
    filter.mestskaCastIDs.length > 0 ||
    filter.okresIDs.length > 0 || 
    filter.obecIDs.length > 0 ||
    order.type == SkolaOrderByEnum.Location
  )
    return Prisma.sql` 
        LEFT JOIN adresa ON adresa.SkolaID = skola.ID
        LEFT JOIN obec ON obec.ID = adresa.ObecID
        LEFT JOIN okres ON okres.ID = obec.OkresID
        LEFT JOIN kraj ON kraj.ID = okres.KrajID
      `;
  return Prisma.sql``;
}

/**
 * Returns SQL part of JOIN clause for joining prijimaci_zkouska
 * @returns {Prisma.Sql}
 */
function whereJoinPrijimaciZkousky(filter: SkolaFilterModel) {
  if (filter.prijimaciZkouskaIDs.length > 0) {
    return Prisma.sql` 
      LEFT JOIN obor_prijimacizkouska ON obor_prijimacizkouska.OborID = Obor.ID
      LEFT JOIN prijimaci_zkouska ON prijimaci_zkouska.ID = obor_prijimacizkouska.PrijimaciZkouskaID`;
  }
  return Prisma.sql``;
}

/**
 * Returns SQL part of WHERE clause for filtering by obor.Kod
 * @returns {Prisma.Sql}
 */
function whereConditionOborKods(oborKods: string[]) {
  if (oborKods.length > 0) {
    return Prisma.sql` AND obor.Kod IN (${Prisma.join(oborKods)})`;
  }
  return Prisma.sql``;
}

/**
 * Returns SQL part of WHERE clause for filtering by ranges of obor.skolne 
 * @returns {Prisma.Sql}
 */
function whereConditionSkolne(skolneRange: FilterItemRange[]) {
  if (skolneRange.length == 0) return Prisma.sql``;
  return Prisma.sql`
    AND (0 = 1 
      ${Prisma.join(
        skolneRange.map((range) => {
          return Prisma.sql`
          OR ( 1 = 1
            ${
              range.start !== undefined
                ? Prisma.sql` AND obor.skolne IS NOT NULL AND obor.skolne >= ${range.start}`
                : Prisma.sql``
            }
            ${
              range.start !== undefined
                ? Prisma.sql` AND obor.skolne IS NOT NULL AND obor.skolne <= ${range.end}`
                : Prisma.sql``
            }
          )
        `;
        })
      , '')}  
    )
  `;
}

/**
 * Returns SQL part of WHERE clause for filtering by prijimaci_zkouska.ID
 * @returns {Prisma.Sql}
 */
function whereConditionPrijimaciZkouskaIDs(prijimaciZkouskaIDs: number[]) {
  if (prijimaciZkouskaIDs.length > 0) {
    return Prisma.sql` AND prijimaci_zkouska.ID IN (${Prisma.join(
      prijimaciZkouskaIDs
    )})`;
  }
  return Prisma.sql``;
}

/**
 * Returns SQL part of WHERE clause for filtering by podskola.DruhPodskolyID
 * @returns {Prisma.Sql}
 */
function whereConditionDruhSkolyIDs(druhSkolyIDs: number[]) {
  if (druhSkolyIDs.length > 0) {
    return Prisma.sql` AND podskola.DruhPodskolyID IN (${Prisma.join(
      druhSkolyIDs
    )})`;
  }
  return Prisma.sql``;
}

/**
 * Returns SQL part of WHERE clause for filtering by filterModel
 * @returns {Prisma.Sql}
 */
function getWhere(filter: SkolaFilterModel) {
  if (
    filter.vzdalenostMax != null &&
    (filter.lat == null || filter.lon == null)
  )
    throw "Missing coordinates";
  return Prisma.sql`
    WHERE 
      obor.aktualniSkolniRok = ${new Date().getFullYear()} 
      ${getWhereSkolaIDs(filter.IDs)} 
      ${getWhereTypSkolyIDs(filter.typSkolyIDs)}
      ${getWhereSkolaNazev(filter.nazev)}

      ${whereConditionKrajIDs(filter.krajIDs)}
      ${whereConditionOkresIDs(filter.okresIDs)}
      ${whereConditionObecIDs(filter.obecIDs)}
      ${whereConditionCastObceIDs(filter.castObceIDs)}
      ${whereConditionMestskaCastIDs(filter.mestskaCastIDs)}
      ${whereConditionOborKods(filter.oborKods)}
      ${whereConditionSkolne(filter.skolneRange)}
      ${whereConditionHodnoceni(filter.hodnoceniRange)}
      ${whereConditionVzdalenostMax(
        filter.vzdalenostMax,
        filter.lat as number,
        filter.lon as number
      )}
      ${whereConditionPrijimaciZkouskaIDs(filter.prijimaciZkouskaIDs)}
      ${whereConditionDruhSkolyIDs(filter.druhSkolyIDs)}
  `;
}

function getWhereSkolaNazev(nazev: string | null | undefined) {
  if (nazev != null) {
    return Prisma.sql` AND skola.Nazev LIKE CONCAT('%', ${nazev} ,'%')`;
  }
  return Prisma.sql``;
}

function getWhereSkolaIDs(skolaIDs: number[]) {
  if (skolaIDs.length > 0) {
    return Prisma.sql` AND skola.ID IN (${Prisma.join(skolaIDs)})`;
  }
  return Prisma.sql``;
}

function getWhereTypSkolyIDs(typSkolyIDs: number[]) {
  if (typSkolyIDs.length > 0) {
    return Prisma.sql` AND skola.TypSkolyID IN (${Prisma.join(typSkolyIDs)})`;
  }
  return Prisma.sql``;
}

/**
 * Gets all skola datas filtered and sorted by given model
 * @param filter Filter model by which to perform filtering
 * @param order Order model by which to perform ordering
 */
export async function getSkolaList(filter: SkolaFilterModel, order: SkolaOrderByModel): Promise<SkolaVysokaStredniType[]> {
  let sql = Prisma.sql`
    SELECT DISTINCT
      -AVG(hodnoceni.hvezdicek) as prumer_hvezdicek,
      ${order.type == SkolaOrderByEnum.Location ? Prisma.sql`(POW((adresa.lon - ${order.lon}),2) + POW((adresa.lat-${order.lat}),2)) as vzdalenost, adresa.lat, adresa.lon,` : Prisma.empty}
      skola.*
    FROM skola
      LEFT JOIN podskola ON podskola.SkolaID = skola.ID
      LEFT JOIN obor ON obor.PodskolaID = podskola.ID
      LEFT JOIN hodnoceni ON hodnoceni.SkolaID = skola.ID
      ${whereJoinAdresa(filter, order)}
      ${whereJoinPrijimaciZkousky(filter)}
    ${getWhere(filter)}
    GROUP BY skola.ID
      ${order.type == SkolaOrderByEnum.Location ? Prisma.sql`, adresa.lon, adresa.lat` : Prisma.empty}
    ${getOrderBy(order)}
    ${getLimit(filter.limit)}
    ${getOffset(filter.offset)}
  `;
  console.log(sql);
  let res : SkolaVysokaStredniType[] = await db.$queryRaw(sql);
  return res;
}
