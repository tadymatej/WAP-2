"use client";

import { filterSkolyAction } from "@/actions/filterSkolyAction";

import { filterSkolkyZakladkyAction } from "@/actions/filtrySkolkyZakladkyAction";
import { SkolaVysokaStredniType } from "@/actions/types/skolaVysokaStredniType";
import { SkolaZakladniMaterskaType } from "@/actions/types/skolaZakladniMaterskaType";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import {
  HodnoceniTypesData,
  SearchingType,
  SkolneTypesData,
} from "@/enums/filter-types";

import { useStore } from "@/state/useStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import SkolaVysokaStredniTile from "./SkolaVysokaStredniTile";
import SkolaZakladniMaterskaTiple from "./SkolaZakladniMaterskaTile";

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
      const result = await filterSkolyAction(
        {
          castObceIDs: [],
          druhSkolyIDs: filter.druhPodskolySelected.map((druh) => druh.id),
          krajIDs: filter.krajeSelected.map((kraj) => kraj.id),
          mestskaCastIDs: filter.mestskeCastiSelected.map(
            (mestskaCast) => mestskaCast.id
          ),
          obecIDs: filter.mestaSelected.map((mesto) => mesto.id),
          okresIDs: filter.okresySelected.map((okres) => okres.id),
          oborKods: filter.vyucovaneOborySelected.map(
            (obor) => obor.kod as string
          ),
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
          offset: page * 15,
          IDs: [],
          lat: filter.latitude,
          lon: filter.longitude,
          limit: 15,
          nazev: undefined,
          vzdalenostMax: undefined,
        },
        {
          type: filter.sortBy,
          lat: filter.latitude,
          lon: filter.longitude,
        }
      );

      // @ts-ignore
      setSkolyVysokeStredni([...skolyVysokeStredni, ...result]);

      // Usually your response will tell you if there is no more data.
      if (result.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
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
          offset: page * 15,
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
          type: filter.sortSkolkaZakladkaBy,
          lat: filter.latitude,
          lon: filter.longitude,
        }
      );

      // @ts-ignore
      setSkolyZakladniMaterske([...skolyZakladniMaterske, ...result]);

      // Usually your response will tell you if there is no more data.
      if (result.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
    }

    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setLoading(false);
    setSkolyVysokeStredni([]);
    setSkolyZakladniMaterske([]);
    return () => {};
  }, [filter]);

  return (
    <div className="flex flex-col">
      <ScrollArea className="space-y-3">
        {searchingType === SearchingType.StredniVysoke
          ? skolyVysokeStredni.map((school) => (
              <SkolaVysokaStredniTile
                favIndex={undefined}
                key={school.id}
                skola={school}
              />
            ))
          : skolyZakladniMaterske.map((school) => (
              <SkolaZakladniMaterskaTiple
                favIndex={undefined}
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
