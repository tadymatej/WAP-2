import { SkolaZakladniMaterskaZarizeniType } from "@/actions/types/skolaZakladniMaterskaType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addressToText } from "@/helpers/address-to-text";
import DotInfoDetailTile from "../generic/DotInfoDetailTile";
import DotInfoTile from "../generic/DotInfoTile";

interface ZarizeniDetailsTileProps {
  podskola: SkolaZakladniMaterskaZarizeniType[];
}

/**
 * Renders a tile displaying details of "Zařízení" (facilities).
 * @param zarizeni - array of "Zařízení" to be displayed
 * @returns rendered "ZarizeniDetailsTile" component
 */
export default function ZarizeniDetailsTile({
  podskola: zarizeni,
}: ZarizeniDetailsTileProps) {
  if (zarizeni.length == 0) return <div></div>;

  return (
    <div className="flex flex-col">
      <h4 className="text-slate-600 font-semibold text-xl text-start">
        {"Zařizení"}
      </h4>
      <Accordion type="single" collapsible className="w-full">
        {zarizeni.map((zar, index) => {
          return (
            <AccordionItem
              value={index.toString(10)}
              key={index.toString(10)}
              borderBottom={false}
            >
              <AccordionTrigger className="text-base font-medium text-start">
                {zar.nazev}
              </AccordionTrigger>
              <AccordionContent className="gap-y-4 flex flex-col pl-2">
                {zar.kapacita && (
                  <DotInfoDetailTile
                    text={"Kapacita"}
                    description={zar.kapacita.toFixed(0)}
                  />
                )}

                {zar.zarizeni_druh_typ?.nazev && (
                  <DotInfoDetailTile
                    text={"Typ zařízení"}
                    description={zar.zarizeni_druh_typ.nazev}
                  />
                )}
                {zar.zarizeniskolkyzakladky_adresa.length == 1 ? (
                  <DotInfoDetailTile
                    text={"Adresa"}
                    description={addressToText(
                      zar.zarizeniskolkyzakladky_adresa.at(0)!.adresa
                    )}
                  />
                ) : (
                  <>
                    <div>
                      <DotInfoDetailTile text={"Adresy"} description="" />
                      <div className="h-2" />
                      <div className="pl-8 flex flex-wrap gap-x-4 gap-y-4">
                        {zar.zarizeniskolkyzakladky_adresa.map((obor) => {
                          const addresaText = addressToText(obor.adresa);
                          return (
                            <DotInfoTile key={addresaText} text={addresaText} />
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
