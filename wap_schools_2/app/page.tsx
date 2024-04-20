import { FavouritesCard } from "@/components/app/favourites/FavouritesCard";
import { FilterCard } from "@/components/app/filters/FIlterCard";
import SchoolsCard from "@/components/app/school_list/SchoolsCard";
import { VysokaStredniVsMaterskaZakladniSelect } from "@/components/app/VysokaStredniVsMaterskaZakladniSelect";

export default async function Home() {
  const thousandStrings = Array.from(
    { length: 300 },
    (_, i) => `String ${i + 1}`
  );
  return (
    <main className="h-full flex flex-col p-8">
      {/*<head></head>*/}
      <VysokaStredniVsMaterskaZakladniSelect />
      <div className="grid grid-cols-8 gap-4 w-full h-full">
        <div className="col-span-2 gap-4 grid grid-rows-2 h-full">
          <div className="row-span-1 h-full">
            <FilterCard />
          </div>
          <div className="row-span-1  h-full">
            <FavouritesCard />
          </div>
        </div>
        <SchoolsCard />
      </div>
    </main>
  );
}

// import { HodnoceniModel } from '../repositories/models/hodnoceniModel';
// import { FilterCard } from "@/components/app/filters/FIlterCard";
// import { RatingPopUp } from "@/components/app/pop_ups/RatingPopUp";
// import { RatingListItem } from "@/components/app/ratings/ratingListItem";

// export default async function Home() {
//   const thousandStrings = Array.from(
//     { length: 300 },
//     (_, i) => `String ${i + 1}`
//   );
//   let model = {
//     popis: "Tohle je popis",
//     autor: "Matěj Žalmánek",
//     hvezdicek: 2,
//     typRoleUzivatele: "Můj typ role",
//   } as HodnoceniModel;

//   return (
//     <RatingListItem model={model}></RatingListItem>
//   );
// }
