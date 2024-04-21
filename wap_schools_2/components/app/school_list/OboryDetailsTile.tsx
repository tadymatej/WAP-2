import { SkolaZakladniMaterskaOboryType } from "@/actions/types/skolkaZakladkaAllData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DotInfoDetailTile from "../generic/DotInfoDetailTile";

interface ZarizeniDetailsTileProps {
  obory: SkolaZakladniMaterskaOboryType[];
}

export default function OboryDetailsTile({ obory }: ZarizeniDetailsTileProps) {
  if (obory.length == 0) return <div></div>;
  return (
    <div className="flex flex-col">
      <h4 className="text-slate-600 font-semibold text-xl text-start">
        {"Obory"}
      </h4>
      <Accordion type="single" collapsible className="w-full">
        {obory.map((obor, index) => {
          return (
            <AccordionItem
              value={index.toString(10)}
              key={index.toString(10)}
              borderBottom={false}
            >
              <AccordionTrigger className="text-base font-medium text-start">
                {obor.nazev}
              </AccordionTrigger>
              <AccordionContent className="gap-y-4 flex flex-col pl-2">
                {obor.kapacita && (
                  <DotInfoDetailTile
                    text={"Kapacita"}
                    description={obor.kapacita.toFixed(0)}
                  />
                )}

                {obor.jazyk?.nazev && (
                  <DotInfoDetailTile
                    text={"Jazyk"}
                    description={obor.jazyk.nazev}
                  />
                )}

                {obor.delkavzdelavani && (
                  <DotInfoDetailTile
                    text={"Délka vzdělávání"}
                    description={obor.delkavzdelavani.toFixed(0)}
                  />
                )}

                {obor.obordobihajici && obor.obordobihajici == true && (
                  <DotInfoDetailTile
                    text={"Dobíhající obor"}
                    description={obor.obordobihajici ? "Ano" : "Ne"}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
