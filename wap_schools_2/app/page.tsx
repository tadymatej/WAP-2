
import { MainFrame } from "@/components/app/main-frame/mainFrame";

export default async function Home() {
  const thousandStrings = Array.from(
    { length: 300 },
    (_, i) => `String ${i + 1}`
  );
  return (
    <MainFrame></MainFrame>
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
