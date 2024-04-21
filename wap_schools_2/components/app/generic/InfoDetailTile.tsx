import { LucideIcon } from "lucide-react";
import InfoTile from "./InfoTile";

interface InfoDetailTileProps {
  Icon: LucideIcon;
  text: string;
  description: string;
}

export default function InfoDetailTile({
  Icon,
  text,
  description,
}: InfoDetailTileProps) {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-1">
        <InfoTile Icon={Icon} text={text} />
      </div>
      <div className="w-3" />
      <div className="font-normal text-right text-sm text-slate-600 w-1/2">
        {description}
      </div>
    </div>
  );
}
