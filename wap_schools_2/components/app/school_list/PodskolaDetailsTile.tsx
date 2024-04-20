import { SkolaVysokaStredniPodskolaType } from "@/actions/types/skolaVysokaStredniAllData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DotInfoDetailTile from "../generic/DotInfoDetailTile";

interface PodskolaDetailsTileProps {
  podskola: SkolaVysokaStredniPodskolaType;
}

export default function PodskolaDetailsTile({
  podskola,
}: PodskolaDetailsTileProps) {
  return (
    <div className="flex flex-col">
      <h4 className="text-slate-600 font-semibold text-xl">
        {podskola.druh_podskoly?.nazev}
      </h4>
      <Accordion type="single" collapsible className="w-full">
        {podskola.obor.map((obor, index) => {
          return (
            <AccordionItem
              value={index.toString(10)}
              key={index.toString(10)}
              borderBottom={false}
            >
              <AccordionTrigger className="text-base font-medium">
                {obor.nazevoboru}
              </AccordionTrigger>
              <AccordionContent className="gap-y-4 flex flex-col">
                <DotInfoDetailTile text={"Hodno"} description="Adresa" />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
