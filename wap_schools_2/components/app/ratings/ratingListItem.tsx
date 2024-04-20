
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stars } from "../pop_ups/Stars";
import { HodnoceniModel } from '../../../repositories/models/hodnoceniModel';

export interface RatingListItemProps {
  model : HodnoceniModel;
}

export function RatingListItem(props : RatingListItemProps) {

  let author : string | null | undefined = props.model.autor;
  if(author == null) author = "Anonymní uživatel";
  return (
    <div className="conteiner bg-slate-50 p-2">
      <div className="grid p-2 grid-rows-2 grid-col max-w-fit">
          <Avatar className="col-span-1 grid-rows-1 min-w-14 min-h-14">
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div className="row-span-1 col-start-2 col-auto text-left mr-2 ml-2 mt-auto mb-auto">
              <div className="font-bold">{author}</div>
              <div className="text-sm text-primary/70">Přidáno 12.11.2012</div>
          </div>
          <div className="row-start-2 col-start-2">
            <div className="row-start-2 col-start-2 font-bold text-base flex mt-2">
              <div>
                {props.model.hvezdicek * 20} %
              </div>
              <Stars count={props.model.hvezdicek}></Stars>
            </div>
            <div className="row-start-2 col-start-2 font-normal text-sm mt-2">
                  {props.model.popis}
            </div>
          </div>
      </div>
    </div>
  )
}