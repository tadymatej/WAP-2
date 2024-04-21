import { SkolaZakladniMaterskaHodnoceniType } from "@/actions/types/skolaZakladniMaterskaType";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchingType } from "@/enums/filter-types";
import { useStore } from "@/state/useStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const setVysokeStredniSelected = useStore(
    (state) => state.filter.setVysokeStredniSelected
  );
  const setZakladniMaterskaSelected = useStore(
    (state) => state.filter.setMaterskaZakladniSelected
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-slate-600 font-semibold text-xl text-start flex-1">
          {hodnoceni.length} Hodnoceni
        </div>
        <div className="flex flex-row">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                onClose={(rating) => {
                  const currentSel =
                    searchingType === SearchingType.MaterskeZakladni
                      ? useStore.getState().filter.zakladniMaterskaSelected
                      : useStore.getState().filter.vysokeStredniSelected;
                  if (currentSel) {
                    const newRat = {
                      ...currentSel,
                      hodnoceni: [...currentSel.hodnoceni, rating],
                    };
                    if (searchingType === SearchingType.MaterskeZakladni) {
                      setZakladniMaterskaSelected(newRat as any);
                    } else {
                      setVysokeStredniSelected(newRat as any);
                    }
                  }
                  router.refresh();
                  setIsDialogOpen(false);
                }}
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
          Tato školka zatím nemá žádná hodnocení.
        </div>
      ) : (
        <div className="text-slate-600 font-normal text-base text-center">
          Tato škola zatím nemá žádná hodnocení.
        </div>
      )}
    </div>
  );
}
