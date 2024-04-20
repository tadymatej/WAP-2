"use server"

import { SkolkaZakladkaAllData } from "@/actions/types/skolkaZakladkaAllData";
import { SkolkaZakladkaFilterModel } from "./filterModels/skolkaZakladkaFilterModel";
import { SkolkaZakladkaOrderByEnum, SkolkaZakladkaOrderByModel } from "./orderByTypes/skolkaZakladkaOrderByTypes";
import { getLimit, getOffset, whereConditionCastObceIDs, whereConditionHodnoceni, whereConditionKrajIDs, whereConditionMestskaCastIDs, whereConditionObecIDs, whereConditionOkresIDs, whereConditionVzdalenostMax } from "./common/rawFunctions";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

function whereJoinAdresa(filter : SkolkaZakladkaFilterModel) {
  if(filter.castObceIDs.length > 0 || filter.krajIDs.length > 0 || filter.mestskaCastIDs.length > 0 || 
      filter.okresIDs.length > 0)
      return Prisma.sql` 
        LEFT JOIN skolkazakladka_adresa ON skolkazakladka_adresa.SkolkaZakladkaID = skolka_zakladka.ID
        LEFT JOIN adresa ON adresa.ID = skolkazakladka_adresa.AdresaID
        LEFT JOIN obec ON obec.ID = adresa.ObecID
        LEFT JOIN okres ON okres.ID = obec.OkresID
        LEFT JOIN kraj ON kraj.ID = okres.KrajID
      `;
  return Prisma.sql``;
}

function whereJoinHodnoceni(filter : SkolkaZakladkaFilterModel) {
  if(filter.hodnoceniRange !== undefined) return Prisma.sql` LEFT JOIN hodnoceni ON hodnoceni.SkolkaZakladkaID = skolka_zakladka.ID`; 
  return Prisma.sql``;
}

function whereJoinZarizeni(filter : SkolkaZakladkaFilterModel) {
  if(filter.zarizeniIDs.length > 0) return Prisma.sql` LEFT JOIN zarizeni_skolky_zakladky ON zarizeni_skolky_zakladky.SkolkaZakladkaID = skolka_zakladka.ID`
  return Prisma.empty;
}

function whereConditionZarizeniIDs(zarizeniIDs : number[]) {
  if(zarizeniIDs.length > 0) {
    return Prisma.sql` AND zarizeni_skolky_zakladky.ID IN (${Prisma.join(zarizeniIDs)})`;
  }
  return Prisma.empty;
}

function getOrderBy(order : SkolkaZakladkaOrderByModel) {
  switch(order.type) {
    case SkolkaZakladkaOrderByEnum.Hodnoceni: return Prisma.sql` ORDER BY hodnoceni.hvezdicek`;
    case SkolkaZakladkaOrderByEnum.Location: {
      if(order.lon == null || order.lat == null) 
        throw "Missing coordinates";
      return Prisma.sql` ORDER BY (POW((adresa.lon - ${order.lon}),2) + POW((adresa.lat-${order.lat}),2))`;
    }
    case SkolkaZakladkaOrderByEnum.Nazev: return Prisma.sql` ORDER BY skolka_zakladka.nazev`;
  }
}

function getOrderByJoinHodnoceni(order : SkolkaZakladkaOrderByEnum) {
  if(order != SkolkaZakladkaOrderByEnum.Hodnoceni) return Prisma.empty;
  return Prisma.sql`LEFT JOIN hodnoceni ON hodnoceni.SkolkaZakladkaID = skolka_zakladka.ID`;
}

function getOrderByJoinAdresa(order : SkolkaZakladkaOrderByEnum) {
  if(order != SkolkaZakladkaOrderByEnum.Location) return Prisma.empty;
  return Prisma.sql` LEFT JOIN skolkazakladka_adresa ON skolkazakladka_adresa.SkolkaZakladkaID = skolka_zakladka.ID 
                      LEFT JOIN adresa ON skolkazakladka_adresa.AdresaID = adresa.ID`;
}

function getWhereSkolkaZakladkaNazev(nazev : string | null | undefined) {
  if(nazev != null) {
    return Prisma.sql` AND skolka_zakladka.Nazev LIKE CONCAT('%', ${nazev} ,'%')`;
  }
  return Prisma.sql``; 
}

function getWhereSkolkaZakladkaIDs(IDs: number[]) {
  if(IDs.length > 0) {
    return Prisma.sql` AND skolka_zakladka.ID IN (${Prisma.join(IDs)})`;
  }
  return Prisma.empty;
}

function getWhereTypZrizovateleIDs(typZrizovateleIDs: number[]) {
  if(typZrizovateleIDs.length > 0) {
    return Prisma.sql` AND skolka_zakladka.TypZrizovateleID IN (${Prisma.join(typZrizovateleIDs)})`;
  }
  return Prisma.empty;
}

function getWhereSkolaDruhTypIDs(skolaDruhTypIDs: number[]) {
  if(skolaDruhTypIDs.length > 0) {
    return Prisma.sql` AND skolka_zakladka.SkolaDruhTypID IN (${Prisma.join(skolaDruhTypIDs)})`;
  }
  return Prisma.empty;
}

function getWhere(filter : SkolkaZakladkaFilterModel) {
  if(filter.vzdalenostMax != null && (filter.lat == null || filter.lon == null)) throw "Missing coordinates";
  return Prisma.sql`
    WHERE 
    1 = 1
    ${getWhereSkolkaZakladkaIDs(filter.IDs)} 
    ${getWhereTypZrizovateleIDs(filter.typZrizovateleIDs)}
    ${getWhereSkolaDruhTypIDs(filter.skolaDruhTypIDs)}
    ${getWhereSkolkaZakladkaNazev(filter.nazev)}
    AND skolka_zakladka.ID IN (
      SELECT DISTINCT skolka_zakladka.ID FROM skolka_zakladka
        ${whereJoinAdresa(filter)}
        ${whereJoinHodnoceni(filter)}
        ${whereJoinZarizeni(filter)}
      WHERE 1 = 1
        ${whereConditionKrajIDs(filter.krajIDs)}
        ${whereConditionOkresIDs(filter.okresIDs)}
        ${whereConditionObecIDs(filter.obecIDs)}
        ${whereConditionCastObceIDs(filter.castObceIDs)}
        ${whereConditionMestskaCastIDs(filter.mestskaCastIDs)}
        ${whereConditionHodnoceni(filter.hodnoceniRange)}
        ${whereConditionVzdalenostMax(filter.vzdalenostMax, filter.lat as number, filter.lon as number)}
        ${whereConditionZarizeniIDs(filter.zarizeniIDs)}
    )
  `;
}

export async function getSkolkaZakladkaList(filter : SkolkaZakladkaFilterModel, order : SkolkaZakladkaOrderByModel) : Promise<SkolkaZakladkaAllData[]> {
  let sql = Prisma.empty;
  if(order.type == SkolkaZakladkaOrderByEnum.Location) {
    sql = Prisma.sql`
      SELECT * 
        FROM (
          SELECT DISTINCT
            skolka_zakladka.*,
            POW((adresa.lon - ${order.lon}), 2) + POW((adresa.lat - ${order.lat}), 2) AS vzdalenost
          FROM skolka_zakladka
          ${getOrderByJoinHodnoceni(order.type)}
          ${getOrderByJoinAdresa(order.type)}
          ${getWhere(filter)}
          ${getOrderBy(order)}
          ${getLimit(filter.limit)}
          ${getOffset(filter.offset)}
      ) AS helpTable ORDER BY helpTable.vzdalenost
  `; 
  }
  else {
    sql = Prisma.sql`
      SELECT DISTINCT
        skolka_zakladka.*
      FROM skolka_zakladka
      ${getOrderByJoinHodnoceni(order.type)}
      ${getWhere(filter)}
      ${getOrderBy(order)}
      ${getLimit(filter.limit)}
      ${getOffset(filter.offset)}
      `;
  }
  let res : SkolkaZakladkaAllData[] = await db.$queryRaw(sql);
  return res;
}