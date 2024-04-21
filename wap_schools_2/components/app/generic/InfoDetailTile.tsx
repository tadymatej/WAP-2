import { LucideIcon } from "lucide-react";
import InfoTile from "./InfoTile";

interface InfoDetailTileProps {
  Icon: LucideIcon;
  text: string;
  description: string;
  subtext?: string;
}

export default function InfoDetailTile({
  Icon,
  text,
  description,
  subtext,
}: InfoDetailTileProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full">
        <div className="flex flex-1">
          <InfoTile Icon={Icon} text={text} />
        </div>
        <div className="w-3" />
        <div className="font-normal text-right text-sm text-slate-600">
          {description}
        </div>
      </div>
      {subtext && (
        <>
          <div className="h-2" />
          <div className="pl-8 font-light text-left text-xs text-slate-600 w-full">
            {subtext}
          </div>
        </>
      )}
    </div>
  );
}
