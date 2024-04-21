"use server"
import { getAdresaList } from "@/repositories/adresaRepository";
import { AdresaFilterModel } from "@/repositories/filterModels/adresaFilterModel";
import { HodnoceniFilterModel } from "@/repositories/filterModels/hodnoceniFilterModel";
import { OborFilterModel } from "@/repositories/filterModels/oborFilterModel";
import { SkolaFilterModel } from "@/repositories/filterModels/skolaFilterModel"
import { getHodnoceniList } from "@/repositories/hodnoceniRepository";
import { getJazykList } from "@/repositories/jazykRepository";
import { getOborList } from "@/repositories/oborRepository";
import { SkolaOrderByModel } from "@/repositories/orderByTypes/skolaOrderByTypes"
import { getPodskolaList } from "@/repositories/podskolaRepository";
import { getSkolaList } from "@/repositories/skolaRepository"
import { getTypZrizovatele } from "@/repositories/typZrizovateleRepository";

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
      let adresy = await getAdresaList(filterModel);
      return {
        ...s,
        ...await getTypZrizovatele({skolaID: s.id}),
        ...await getJazykList({skolaID: s.id}),
        adresa: adresy.length > 0 ? adresy[0] : null,
        hodnoceni: await getHodnoceniList(hodnoceniFilterModel),
        podskola: await Promise.all(podskoly.map(async (podskola) => {
          let oborFilter : OborFilterModel = {
            podskolaIDs: [podskola.id],
            IDs: []
          }
          return {
            ...podskola,
            obor: await getOborList(oborFilter)
          }
        }))
      }
    }));
    return res;
}