"use client";

import { filterSkoly } from "@/actions/filterSkolyAction";

import { filterSkolkyZakladkyAction } from "@/actions/filtrySkolkyZakladkyAction";
import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniAllData";
import { SkolaZakladniMaterskaType } from "@/actions/types/skolkaZakladkaAllData";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import {
  HodnoceniTypesData,
  SearchingType,
  SkolneTypesData,
} from "@/enums/filter-types";
import { SkolaOrderByFromSortBy } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { SkolkaZakladkaOrderByFromSortBy } from "@/repositories/orderByTypes/skolkaZakladkaOrderByTypes";
import { useStore } from "@/state/useStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import SkolaVysokaStredniTile from "./SkolaVysokaStredniTile";

export function SchoolList() {
  const filter = useStore((state) => state.filter);

  const searchingType = filter.searchingType;

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skolyVysokeStredni, setSkolyVysokeStredni] = useState<
    SkolaVysokaStredniType[]
  >([]);
  const [skolyZakladniMaterske, setSkolyZakladniMaterske] = useState<
    SkolaZakladniMaterskaType[]
  >([]);

  const next = async () => {
    setLoading(true);

    if (searchingType === SearchingType.StredniVysoke) {
      const result = await filterSkoly(
        {
          castObceIDs: [],
          druhSkolyIDs: filter.druhPodskolySelected.map((druh) => druh.id),
          krajIDs: filter.krajeSelected.map((kraj) => kraj.id),
          mestskaCastIDs: filter.mestskeCastiSelected.map(
            (mestskaCast) => mestskaCast.id
          ),
          obecIDs: filter.mestaSelected.map((mesto) => mesto.id),
          okresIDs: filter.okresySelected.map((okres) => okres.id),
          oborIDs: filter.vyucovaneOborySelected.map((obor) => obor.id),
          prijimaciZkouskaIDs: filter.prijmaciZkouskySelected.map(
            (prijimaciZkouska) => prijimaciZkouska.id
          ),
          skolneRange: filter.skolneSelected.map((skolne) => {
            //convert to Skolne. I need to do it  based on the value of the key

            return SkolneTypesData[skolne.id as keyof typeof SkolneTypesData]
              .range;
          }),
          typSkolyIDs: filter.typySkolSelected.map((typSkoly) => typSkoly.id),
          hodnoceniRange: HodnoceniTypesData[filter.hodnoceniSelected].range,
          offset: filter.offset,
          IDs: [],
          lat: filter.latitude,
          lon: filter.longitude,
          limit: 15,
          nazev: undefined,
          vzdalenostMax: undefined,
        },
        {
          type: SkolaOrderByFromSortBy[filter.sortBy],
        }
      );

      setSkolyVysokeStredni([...skolyVysokeStredni, ...result]);
    }

    if (searchingType === SearchingType.MaterskeZakladni) {
      const result = await filterSkolkyZakladkyAction(
        {
          castObceIDs: [],
          krajIDs: filter.krajeSelected.map((kraj) => kraj.id),
          mestskaCastIDs: filter.mestskeCastiSelected.map(
            (mestskaCast) => mestskaCast.id
          ),
          obecIDs: filter.mestaSelected.map((mesto) => mesto.id),
          okresIDs: filter.okresySelected.map((okres) => okres.id),

          hodnoceniRange: HodnoceniTypesData[filter.hodnoceniSelected].range,
          offset: filter.offset,
          IDs: [],
          lat: filter.latitude,
          lon: filter.longitude,
          limit: 15,
          nazev: undefined,
          vzdalenostMax: undefined,
          skolaDruhTypIDs: filter.skolaDruhTypeSelected.map((druh) => druh.id),
          typZrizovateleIDs: filter.typySkolSelected.map((typ) => typ.id),
          zarizeniIDs: [],
        },
        {
          type: SkolkaZakladkaOrderByFromSortBy[filter.sortBy],
        }
      );

      setSkolyZakladniMaterske([...skolyZakladniMaterske, ...result]);
    }

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
