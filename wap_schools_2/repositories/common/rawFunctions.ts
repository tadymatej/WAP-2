import { Prisma } from "@prisma/client";
import { FilterItemRange } from "../filterModels/filterItems/filterItemRange";


export function whereConditionKrajIDs(krajIDs : number[]) {
  if(krajIDs.length > 0) {
    return Prisma.sql` AND kraj.ID IN (${Prisma.join(krajIDs)})`;
  }
  return Prisma.sql``;
}

export function whereConditionOkresIDs(okresIDs : number[]) {
  if(okresIDs.length > 0) {
    return Prisma.sql` AND okres.ID IN (${Prisma.join(okresIDs)})`;
  }
  return Prisma.sql``;
}

export function whereConditionObecIDs(obecIDs : number[]) {
  if(obecIDs.length > 0) {
    return Prisma.sql` AND obec.ID IN (${Prisma.join(obecIDs)})`;
  }
  return Prisma.sql``;
}

export function whereConditionCastObceIDs(castObceIDs : number[]) {
  if(castObceIDs.length > 0) {
    return Prisma.sql` AND adresa.CastObceID IN (${Prisma.join(castObceIDs)})`;
  }
  return Prisma.sql``;
}

export function whereConditionMestskaCastIDs(mestskaCastIDs : number[]) {
  if(mestskaCastIDs.length > 0) {
    return Prisma.sql` AND adresa.MestskaCastObvodID IN (${Prisma.join(mestskaCastIDs)})`;
  }
  return Prisma.sql``;
}


export function whereConditionHodnoceni(hodnoceniRange : FilterItemRange | undefined) {
  if(hodnoceniRange === undefined || (hodnoceniRange.end === undefined && hodnoceniRange.start === undefined)) 
    return Prisma.sql``;
  return Prisma.sql` AND ( 0 = 1
    ${hodnoceniRange.start !== undefined ? Prisma.sql` OR hodnoceni.hvezdicek >= ${hodnoceniRange.start}` : Prisma.empty}
    ${hodnoceniRange.end !== undefined ? Prisma.sql` OR hodnoceni.hvezdicek <= ${hodnoceniRange.end}` : Prisma.empty}
  )`;
}

export function whereConditionVzdalenostMax(vzdalenostMax : number | undefined, lat : number, lon : number) {
  if(vzdalenostMax !== undefined) {
    return Prisma.sql` AND (POW((adresa.lon - ${lon}),2) + POW((adresa.lat-${lat}),2)) <= ${vzdalenostMax}`;
  }
  return Prisma.sql``;
}



export function getLimit(limit : number | undefined) {
  if(limit != null) {
    return Prisma.sql`LIMIT ${limit}`;
  }
  return Prisma.sql``;
}

export function getOffset(offset : number | undefined) {
  if(offset != null)  {
    return Prisma.sql`OFFSET ${offset}`;
  }
  return Prisma.sql``;
}
