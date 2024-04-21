import { SkolaZakladniMaterskaHodnoceniType } from "@/actions/types/skolkaZakladkaAllData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchingType } from "@/enums/filter-types";
import { useStore } from "@/state/useStore";
import { Plus } from "lucide-react";
import { RatingPopUp } from "../pop_ups/RatingPopUp";
import { RatingListItem } from "../ratings/ratingListItem";

interface HodnoceniSectionProps {
  hodnoceni: SkolaZakladniMaterskaHodnoceniType[];
  skolaId: number;
}

export default function HodnoceniSection({
  hodnoceni,
  skolaId,
}: HodnoceniSectionProps) {
  const searchingType = useStore((state) => state.filter.searchingType);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-slate-600 font-semibold text-xl text-start flex-1">
          {hodnoceni.length} Hodnocení
        </div>
        <div className="flex flex-row">
          <Dialog>
            <DialogTrigger>
              <Button>
                <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <RatingPopUp
                skolkaZakladkaID={
                  searchingType === SearchingType.MaterskeZakladni
                    ? skolaId
                    : null
                }
                skolaID={
                  searchingType === SearchingType.StredniVysoke ? skolaId : null
                }
              />
            </DialogContent>
          </Dialog>
          {/*<div className="w-2" />
        <Button variant="outline">Napsat hodnoceni</Button>*/}
        </div>
      </div>
      <div className="h-6" />
      {hodnoceni.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          {hodnoceni.map((hodnoceni, index) => {
            return <RatingListItem model={hodnoceni} key={index} />;
          })}
        </div>
      ) : searchingType === SearchingType.MaterskeZakladni ? (
        <div className="text-slate-600 font-normal text-base text-center">
          Tato škola zatím nemá žádná hodnocení.
        </div>
      ) : (
        <div className="text-slate-600 font-normal text-base text-center">
          Tato škola zatím nemá žádná hodnocení.
        </div>
      )}
    </div>
  );
}
