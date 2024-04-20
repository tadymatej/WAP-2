import { FilterCard } from "@/components/app/filters/FIlterCard";
import SchoolsCard from "@/components/app/school_list/SchoolsCard";

export default async function Home() {
  const thousandStrings = Array.from(
    { length: 300 },
    (_, i) => `String ${i + 1}`
  );
  return (
    <main className="h-full p-8">
      <div className="grid grid-cols-8 gap-4 w-full h-full">
        <div className="col-span-2 gap-4 grid grid-rows-2 h-full">
          <div className="row-span-1 h-full">
            <FilterCard />
          </div>
          <div className="row-span-1  h-full">
            <FilterCard />
          </div>
        </div>
        <SchoolsCard />
      </div>
    </main>
  );
}
