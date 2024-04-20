import { SkolaVysokaStredniPodskolaType } from "@/actions/types/skolaVysokaStredniAllData";
import DotInfoTile from "../generic/DotInfoTile";

interface SkolaPodskolTileProps {
  podskola: SkolaVysokaStredniPodskolaType;
}

export default function PodskolTile({ podskola }: SkolaPodskolTileProps) {
  const uniqueObory = podskola.obor
    .map((obor) => obor.nazevoboru)
    .filter(
      (nazev, index, self) => nazev !== null && self.indexOf(nazev) === index
    ) as string[];
  return (
    <div className="flex flex-col">
      <div className="text-sm font-normal text-slate-600">
        {podskola.druh_podskoly?.nazev}
      </div>
      <div className="h-2" />
      <div className="pl-8 flex flex-wrap gap-x-4 gap-y-4">
        {uniqueObory.map((obornazev) => (
          <DotInfoTile key={obornazev} text={obornazev ?? ""} />
        ))}
      </div>
    </div>
  );
}
