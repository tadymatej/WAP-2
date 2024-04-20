"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { FilterItemRange } from "./filterModels/filterItems/filterItemRange";
import { SkolaFilterModel } from "./filterModels/skolaFilterModel";
import {
  SkolaOrderByEnum,
  SkolaOrderByModel,
} from "./orderByTypes/skolaOrderByTypes";

import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniAllData";
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

function getOrderBy(order: SkolaOrderByModel) {
  switch (order.type) {
    case SkolaOrderByEnum.Hodnoceni:
      return Prisma.sql` ORDER BY hodnoceni.hvezdicek`;
    case SkolaOrderByEnum.Location: {
      if (order.lon == null || order.lat == null) throw "Missing coordinates";
      return Prisma.sql` ORDER BY (POW((adresa.lon - ${order.lon}),2) + POW((adresa.lat-${order.lat}),2))`;
    }
    case SkolaOrderByEnum.Nazev:
      return Prisma.sql` ORDER BY skola.nazev`;
  }
}

function whereJoinAdresa(filter: SkolaFilterModel) {
  if (
    filter.castObceIDs.length > 0 ||
    filter.krajIDs.length > 0 ||
    filter.mestskaCastIDs.length > 0 ||
    filter.okresIDs.length > 0
  )
    return Prisma.sql` 
        LEFT JOIN adresa ON adresa.SkolaID = skola.ID
        LEFT JOIN obec ON obec.ID = adresa.ObecID
        LEFT JOIN okres ON okres.ID = obec.OkresID
        LEFT JOIN kraj ON kraj.ID = okres.KrajID
      `;
  return Prisma.sql``;
}

function whereJoinHodnoceni(filter: SkolaFilterModel) {
  if (filter.hodnoceniRange !== undefined)
    return Prisma.sql` LEFT JOIN hodnoceni ON hodnoceni.SkolaID = skola.ID`;
  return Prisma.sql``;
}

// function whereJoinPodskola(filter : SkolaFilterModel) {
//   if(filter.druhSkolyIDs.length > 0 || filter.oborIDs.length > 0 || filter.prijimaciZkouskaIDs.length > 0 || filter.skolneRange.length > 0) {
//     return Prisma.sql` LEFT JOIN podskola ON podskola.SkolaID = skola.ID`;
//   }
//   return Prisma.sql``;
// }

// function whereJoinObor(filter : SkolaFilterModel) {
//   if(filter.oborIDs.length > 0 || filter.prijimaciZkouskaIDs.length > 0 || filter.skolneRange.length > 0) {
//     return Prisma.sql` LEFT JOIN obor ON obor.PodskolaID = podskola.ID`;
//   }
//   return Prisma.sql``;
// }

function whereJoinPrijimaciZkousky(filter: SkolaFilterModel) {
  if (filter.prijimaciZkouskaIDs.length > 0) {
    return Prisma.sql` 
      LEFT JOIN obor_prijimacizkouska ON obor_prijimacizkouska.OborID = Obor.ID
      LEFT JOIN prijimaci_zkouska ON prijimaci_zkouska.ID = obor_prijimacizkouska.PrijimaciZkouskaID`;
  }
  return Prisma.sql``;
}

function whereConditionOborIDs(oborIDs: number[]) {
  if (oborIDs.length > 0) {
    return Prisma.sql` AND obor.ID IN (${Prisma.join(oborIDs)})`;
  }
  return Prisma.sql``;
}

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
      )}  
    )
  `;
}

function whereConditionPrijimaciZkouskaIDs(prijimaciZkouskaIDs: number[]) {
  if (prijimaciZkouskaIDs.length > 0) {
    return Prisma.sql` AND prijimaci_zkouska.ID IN (${Prisma.join(
      prijimaciZkouskaIDs
    )})`;
  }
  return Prisma.sql``;
}

function whereConditionDruhSkolyIDs(druhSkolyIDs: number[]) {
  if (druhSkolyIDs.length > 0) {
    return Prisma.sql` AND podskola.DruhPodskolyID IN (${Prisma.join(
      druhSkolyIDs
    )})`;
  }
  return Prisma.sql``;
}

// kraj, mesto, mestska cast, okres, vyucovane obory, typy skol (církevní, státní, ), druhy škol (vysoká, střední, ...), hodnoceni, přijimaci zkoušky, školné, [vzdálenost]
function getWhere(filter: SkolaFilterModel) {
  if (
    filter.vzdalenostMax != null &&
    (filter.lat == null || filter.lon == null)
  )
    throw "Missing coordinates";
  return Prisma.sql`
    WHERE 
    1 = 1
    ${getWhereSkolaIDs(filter.IDs)} 
    ${getWhereTypSkolyIDs(filter.typSkolyIDs)}
    ${getWhereSkolaNazev(filter.nazev)}
    AND skola.ID IN (
      SELECT DISTINCT skola.ID FROM skola
        LEFT JOIN podskola ON podskola.SkolaID = skola.ID
        LEFT JOIN obor ON obor.PodskolaID = podskola.ID
        ${whereJoinAdresa(filter)}
        ${whereJoinHodnoceni(filter)}
        ${whereJoinPrijimaciZkousky(filter)}
      WHERE obor.aktualniSkolniRok = ${new Date().getFullYear()}
        ${whereConditionKrajIDs(filter.krajIDs)}
        ${whereConditionOkresIDs(filter.okresIDs)}
        ${whereConditionObecIDs(filter.obecIDs)}
        ${whereConditionCastObceIDs(filter.castObceIDs)}
        ${whereConditionMestskaCastIDs(filter.mestskaCastIDs)}
        ${whereConditionOborIDs(filter.oborIDs)}
        ${whereConditionSkolne(filter.skolneRange)}
        ${whereConditionHodnoceni(filter.hodnoceniRange)}
        ${whereConditionVzdalenostMax(
          filter.vzdalenostMax,
          filter.lat as number,
          filter.lon as number
        )}
        ${whereConditionPrijimaciZkouskaIDs(filter.prijimaciZkouskaIDs)}
        ${whereConditionDruhSkolyIDs(filter.druhSkolyIDs)}
    )
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

function getOrderByJoinAdresa(order: SkolaOrderByEnum) {
  if (order != SkolaOrderByEnum.Location) return Prisma.empty;
  return Prisma.sql`LEFT JOIN adresa ON adresa.SkolaID = skola.ID`;
}

function getOrderByJoinHodnoceni(order: SkolaOrderByEnum) {
  if (order != SkolaOrderByEnum.Hodnoceni) return Prisma.empty;
  return Prisma.sql`LEFT JOIN hodnoceni ON hodnoceni.SkolaID = skola.ID`;
}

export async function getSkolaList(filter: SkolaFilterModel, order: SkolaOrderByModel): Promise<SkolaVysokaStredniType[]> {
  let sql = Prisma.sql`
    SELECT 
      *
    FROM skola 
    ${getOrderByJoinAdresa(order.type)}
    ${getOrderByJoinHodnoceni(order.type)}
    ${getWhere(filter)}
    ${getOrderBy(order)}
    ${getLimit(filter.limit)}
    ${getOffset(filter.offset)}
  `;
  return await db.$queryRaw(sql);
}
