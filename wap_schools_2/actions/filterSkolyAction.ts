"use server"
import { getAdresaList } from "@/repositories/adresaRepository";
import { AdresaFilterModel } from "@/repositories/filterModels/adresaFilterModel";
import { HodnoceniFilterModel } from "@/repositories/filterModels/hodnoceniFilterModel";
import { OborFilterModel } from "@/repositories/filterModels/oborFilterModel";
import { SkolaFilterModel } from "@/repositories/filterModels/skolaFilterModel"
import { getHodnoceniList } from "@/repositories/hodnoceniRepository";
import { getOborList } from "@/repositories/oborRepository";
import { SkolaOrderByModel } from "@/repositories/orderByTypes/skolaOrderByTypes"
import { getPodskolaList } from "@/repositories/podskolaRepository";
import { getSkolaList } from "@/repositories/skolaRepository"

export async function filterSkoly(filter : SkolaFilterModel, order : SkolaOrderByModel) {
    let skoly = await getSkolaList(filter, order);
    let res = await Promise.all(skoly.map(async (s) => {
      let filterModel : AdresaFilterModel = {
        skolaIDs: [s.id],
        IDs: [],
        skolkaZakladkaIDs: []
      };
      let hodnoceniFilterModel : HodnoceniFilterModel = {
        skolaIDs: [s.id],
        skolkaZakladkaIDs: []
      }
      let podskoly = await getPodskolaList(filterModel);
      return {
        ...s,
        ...await getAdresaList(filterModel),
        ...await getHodnoceniList(hodnoceniFilterModel),
        ...await Promise.all(podskoly.map(async (podskola) => {
          let oborFilter : OborFilterModel = {
            podskolaIDs: [podskola.id],
            IDs: []
          }
          return {
            ...podskola,
            ...await getOborList(oborFilter)
          }
        }))
      }
    }));
    return res;
}