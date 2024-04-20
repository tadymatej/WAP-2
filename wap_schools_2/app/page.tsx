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
