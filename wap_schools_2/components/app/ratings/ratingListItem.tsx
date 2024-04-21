import { SkolaZakladniMaterskaHodnoceniType } from "@/actions/types/skolaZakladniMaterskaType";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Stars } from "../pop_ups/Stars";

export interface RatingListItemProps {
  model: SkolaZakladniMaterskaHodnoceniType;
}

/**
 * Renders a single rating item.
 *
 * @param props - The props for the RatingListItem component.
 * @returns The rendered RatingListItem component.
 */
export function RatingListItem(props: RatingListItemProps) {
  let author: string | null | undefined = props.model.autor;
  if (author == null) author = "Anonymní uživatel";
  return (
    <div>
      <div className="grid p-2 grid-rows-2 grid-col max-w-fit">
        <Avatar className="col-span-1 grid-rows-1 min-w-7 min-h-7">
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div className="row-span-1 col-start-2 col-auto gap-y-4 text-left mr-2 ml-4 mb-auto">
          <div className="font-bold text-base">{author}</div>
          <div className="text-sm font-normal text-primary/60">
            Přidáno 12.11.2012
          </div>
        </div>
        <div className="row-start-2 col-start-2 ml-4">
          <div className="row-start-2 col-start-2 font-bold text-base flex mt-1">
            <div>{props.model.hvezdicek * 2} %</div>
            <Stars count={props.model.hvezdicek / 10}></Stars>
          </div>
          <div className="row-start-2 col-start-2 font-normal text-sm pt-2">
            {props.model.popis}
          </div>
        </div>
      </div>
    </div>
  );
}
