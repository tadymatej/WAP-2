import { FilterCard } from "@/components/app/filters/FIlterCard";

export default async function Home() {
  return (
    <main className="flex min-h-screen p-8">
      <div className="grid grid-cols-5 gap-8">
        <div className="bg-red-500 col-span-1 h-full grid grid-rows-2">
          <div className="row-span-1">
            <FilterCard />
          </div>
          <div className="row-span-1">
            <FilterCard />
          </div>
        </div>
        <div className="bg-blue-500 col-span-4 h-full"></div>
      </div>
    </main>
  );
}
