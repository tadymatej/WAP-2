"use server"

import { getAdresaList } from "@/repositories/adresaRepository";
import { AdresaFilterModel } from "@/repositories/filterModels/adresaFilterModel";
import { OborSkolkyZakladkyFilterModel } from "@/repositories/filterModels/oborSkolkyZakladkyFilterModel";
import { SkolkaZakladkaFilterModel } from "@/repositories/filterModels/skolkaZakladkaFilterModel";
import { getOborSkolkyZakladkyList } from "@/repositories/oborSkolkyZakladkyRepository";
import { SkolkaZakladkaOrderByModel } from "@/repositories/orderByTypes/skolkaZakladkaOrderByTypes";
import { getSkolkaZakladkaList } from "@/repositories/skolkaZakladkaRepository";
import { getZarizeniSkolkyZakladkyList } from "@/repositories/zarizeniSkolkyZakladkyRepository";
import { SkolaZakladniMaterskaType } from "./types/skolaZakladniMaterskaType";
import { getHodnoceniList } from "@/repositories/hodnoceniRepository";

/**
 * Finds skolka_zakladka entities and its corresponding data joined from another tables
 * that follows conditions in filterModel and will be ordered by orderModel
 * @param filter filterModel by which we want to perform filtering
 * @param order orderModel by which we want to perform sorting
 * @returns {SkolaZakladniMaterskaType[]} 
 */
export async function filterSkolkyZakladkyAction(filter : SkolkaZakladkaFilterModel, order : SkolkaZakladkaOrderByModel) {
  let skolky = await getSkolkaZakladkaList(filter, order);
  return await Promise.all(skolky.map(async (skolka) => {
    let oborSkolkyZakladkyFilter : OborSkolkyZakladkyFilterModel = {
      skolkaZakladkaIDs: [skolka.id],
      IDs: []
    };
    let adresaFilterModel : AdresaFilterModel = {
      skolkaZakladkaIDs: [skolka.id],
      IDs: [],
      skolaIDs: []
    }
    let adresy = await getAdresaList(adresaFilterModel);
    let adresa = adresy.length > 0 ? adresy[0] : null;
    return {
      ...skolka,
      obor_skolky_zakladky: await getOborSkolkyZakladkyList(oborSkolkyZakladkyFilter),
      hodnoceni: await getHodnoceniList(adresaFilterModel),
      zarizeni_skolky_zakladky: await getZarizeniSkolkyZakladkyList(oborSkolkyZakladkyFilter),
      ...adresa
    }
  }))
}