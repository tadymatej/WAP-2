import { SkolaVysokaStredniPodskolaType } from "@/actions/types/skolaVysokaStredniType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DotInfoDetailTile from "../generic/DotInfoDetailTile";
import DotInfoTile from "../generic/DotInfoTile";

interface PodskolaDetailsTileProps {
  podskola: SkolaVysokaStredniPodskolaType;
}

export default function PodskolaDetailsTile({
  podskola,
}: PodskolaDetailsTileProps) {
  return (
    <div className="flex flex-col">
      <h4 className="text-slate-600 font-semibold text-xl text-start">
        {podskola.druh_podskoly?.nazev}
      </h4>
      <Accordion type="single" collapsible className="w-full">
        {podskola.obor.map((obor, index) => {
          const oboryPrijmacichZkousek = obor.obor_prijimacizkouska
            .map((zkouska) => zkouska.prijimaci_zkouska?.nazev)
            .filter((nazev) => nazev !== null && nazev !== undefined);
          const oborVhodnostProZaky = obor.obor_vhodnostprozaky
            .map((vhodnost) => vhodnost.vhodnost_pro_zaky?.nazev)
            .filter((nazev) => nazev !== null && nazev !== undefined);
          return (
            <AccordionItem
              value={index.toString(10)}
              key={index.toString(10)}
              borderBottom={false}
            >
              <AccordionTrigger className="text-base font-medium text-start">
                {obor.nazevoboru}
              </AccordionTrigger>
              <AccordionContent className="gap-y-4 flex flex-col pl-2">
                {obor.delkastudia && (
                  <DotInfoDetailTile
                    text={"Délka studia"}
                    description={
                      obor.delkastudia > 1
                        ? obor.delkastudia.toFixed(0) + " roky"
                        : obor.delkastudia.toFixed(0) + "rok"
                    }
                  />
                )}
                {obor.druh_studia?.nazev && (
                  <DotInfoDetailTile
                    text={"Druh studia"}
                    description={obor.druh_studia.nazev}
                  />
                )}
                {obor.forma_studia?.nazev && (
                  <DotInfoDetailTile
                    text={"Forma studia"}
                    description={obor.forma_studia.nazev}
                  />
                )}
                {obor.aktualnirokprijmou && (
                  <DotInfoDetailTile
                    text={"Aktuální rok přijmou"}
                    description={obor.aktualnirokprijmou.toFixed(0)}
                  />
                )}
                {obor.minulyrokprihlaseno && (
                  <DotInfoDetailTile
                    text={"Minulý rok přihlášeno"}
                    description={obor.minulyrokprihlaseno.toFixed(0)}
                  />
                )}
                {obor.minulyrokprijato && (
                  <DotInfoDetailTile
                    text={"Minulý rok přijato"}
                    description={obor.minulyrokprijato.toFixed(0)}
                  />
                )}
                {oboryPrijmacichZkousek.length > 0 && (
                  <div>
                    <DotInfoDetailTile
                      text={"Přijímací zkoušky"}
                      description=""
                    />
                    <div className="h-2" />
                    <div className="pl-8 flex flex-wrap gap-x-4 gap-y-4">
                      {oboryPrijmacichZkousek.map((obor) => (
                        <DotInfoTile key={obor} text={obor ?? ""} />
                      ))}
                    </div>
                  </div>
                )}
                {oborVhodnostProZaky.length > 0 && (
                  <div>
                    <DotInfoDetailTile
                      text={"Vhodnost pro žáky"}
                      description=""
                    />
                    <div className="h-2" />
                    <div className="pl-8 flex flex-wrap gap-x-4 gap-y-4">
                      {oborVhodnostProZaky.map((obor) => (
                        <DotInfoTile key={obor} text={obor ?? ""} />
                      ))}
                    </div>
                  </div>
                )}
                {obor.povinnalekarskaprohlidka && (
                  <DotInfoDetailTile
                    text={"Povinná lékařská prohlídka"}
                    description="Ano"
                  />
                )}
                {obor.prospech && (
                  <DotInfoDetailTile
                    text={"Prospěch pro přijetí"}
                    description={obor.prospech.toFixed(1)}
                  />
                )}
                {obor.skolne && (
                  <DotInfoDetailTile
                    text={"Školné za rok"}
                    description={obor.skolne.toFixed(0) + " Kč"}
                  />
                )}
                {obor.stupen_vzdelani?.nazev && (
                  <DotInfoDetailTile
                    text={"Stupeň vzdělání"}
                    description={obor.stupen_vzdelani.nazev}
                  />
                )}
                {obor.ukonceni_studia?.nazev && (
                  <DotInfoDetailTile
                    text={"Ukončení studia"}
                    description={obor.ukonceni_studia.nazev}
                  />
                )}
                {obor.vhodneprozakyozp && (
                  <DotInfoDetailTile
                    text={"Vhodné pro žáky s OZP"}
                    description="Ano"
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
