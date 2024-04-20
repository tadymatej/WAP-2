"use server"

import { getAdresaList } from "@/repositories/adresaRepository";
import { AdresaFilterModel } from "@/repositories/filterModels/adresaFilterModel";
import { OborSkolkyZakladkyFilterModel } from "@/repositories/filterModels/oborSkolkyZakladkyFilterModel";
import { SkolkaZakladkaFilterModel } from "@/repositories/filterModels/skolkaZakladkaFilterModel";
import { getOborSkolkyZakladkyList } from "@/repositories/oborSkolkyZakladkyRepository";
import { SkolkaZakladkaOrderByModel } from "@/repositories/orderByTypes/skolkaZakladkaOrderByTypes";
import { getSkolkaZakladkaList } from "@/repositories/skolkaZakladkaRepository";
import { getZarizeniSkolkyZakladkyList } from "@/repositories/zarizeniSkolkyZakladkyRepository";

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
    return {
      ...skolka,
      obor_skolky_zakladky: await getOborSkolkyZakladkyList(oborSkolkyZakladkyFilter),
      zarizeni_skolky_zakladky: await getZarizeniSkolkyZakladkyList(oborSkolkyZakladkyFilter),
      skolkazakladka_adresa: await getAdresaList(adresaFilterModel)
    }
  }))
}