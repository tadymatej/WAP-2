"use client";

import {
  searchingForSchools,
  SkolaVysokaStredniList,
} from "@/actions/search-schools";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useStore } from "@/state/useStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import SkolaVysokaStredniTile from "./SkolaVysokaStredniTile";

export function SchoolList() {
  const filter = useStore((state) => state.filter);
  //searchingForSchools(filterState: filter);
  //Use useeffect to call searchingForSchools when filter changes
  //use 500ms debounce

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [schools, setSchools] = useState<SkolaVysokaStredniList>([]);

  const next = async () => {
    setLoading(true);

    console.log("Searching for schools: next");

    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    const result = await searchingForSchools({
      filterState: {
        currentLocation: filter.currentLocation,
        krajeSelected: filter.krajeSelected,
        mestaSelected: filter.mestaSelected,
        mestskeCastiSelected: filter.mestskeCastiSelected,
        okresySelected: filter.okresySelected,
        typySkolSelected: filter.typySkolSelected,
        vyucovaneOborySelected: filter.vyucovaneOborySelected,
        hodnoceniSelected: filter.hodnoceniSelected,
        prijmaciZkouskySelected: filter.prijmaciZkouskySelected,
        skolneSelected: filter.skolneSelected,
        offset: page,
        sortBy: filter.sortBy,
        druhPodskolySelected: filter.druhPodskolySelected,
        skolaDruhTypeSelected: filter.skolaDruhTypeSelected,
        lokaceSelected: filter.lokaceSelected,
        vysokeStredniSelected: filter.vysokeStredniSelected,
        zakladniMaterskaSelected: filter.zakladniMaterskaSelected,
        searchingType: filter.searchingType,
        favourites: filter.favourites,
      },
    });
    setSchools([...schools, ...result]);
    console.log("I have schools: next");

    setPage((prev) => prev + 1);

    console.log("I have schools: next");

    // Usually your response will tell you if there is no more data.
    if (result.length < 3) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
    setSchools([]);
    return () => {};
  }, [filter]);

  return (
    <div className="flex flex-col">
      <ScrollArea className="space-y-3">
        {schools.map((school) => (
          <SkolaVysokaStredniTile
            inFavorites={false}
            key={school.id}
            skola={school}
          />
        ))}
      </ScrollArea>
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
      </InfiniteScroll>
    </div>
  );
}
