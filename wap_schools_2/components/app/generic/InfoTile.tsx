import { LucideIcon } from "lucide-react";

interface InfoTileProps {
  Icon: LucideIcon;
  text: string;
}

export default function InfoTile({ Icon, text }: InfoTileProps) {
  return (
    <div className="flex flex-row items-center">
      <Icon className="w-5 h-5 text-slate-600 " />
      <div className="w-2" />
      <div className="font-normal text-sm text-slate-600">{text}</div>
    </div>
  );
}
