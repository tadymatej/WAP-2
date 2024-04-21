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
<<<<<<< HEAD
/**
 * Renders a list of schools based on the selected filters and search type.
 *
 * @returns The rendered school list component.
 */

export function SchoolList() {
  const krajeSelected = useStore((state) => state.filter.krajeSelected);
  const mestaSelected = useStore((state) => state.filter.mestaSelected);
  const mestskeCastiSelected = useStore(
    (state) => state.filter.mestskeCastiSelected
  );
  const okresySelected = useStore((state) => state.filter.okresySelected);
  const vyucovaneOborySelected = useStore(
    (state) => state.filter.vyucovaneOborySelected
  );
  const druhPodskolySelected = useStore(
    (state) => state.filter.druhPodskolySelected
  );
  const skolaDruhTypeSelected = useStore(
    (state) => state.filter.skolaDruhTypeSelected
  );
  const typySkolSelected = useStore((state) => state.filter.typySkolSelected);
  const hodnoceniSelected = useStore((state) => state.filter.hodnoceniSelected);
  const prijmaciZkouskySelected = useStore(
    (state) => state.filter.prijmaciZkouskySelected
  );
  const skolneSelected = useStore((state) => state.filter.skolneSelected);
  const longitude = useStore((state) => state.filter.longitude);
  const latitude = useStore((state) => state.filter.latitude);
  const sortBy = useStore((state) => state.filter.sortBy);
  const sortSkolkaZakladkaBy = useStore(
    (state) => state.filter.sortSkolkaZakladkaBy
  );
  const searchingType = useStore((state) => state.filter.searchingType);
=======
import React from "react";

export function SchoolList() {
  const filter = useStore((state) => state.filter);

  const showList = useStore((state) => state.responsive.showList);

  const searchingType = filter.searchingType;
>>>>>>> origin/refactor

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
      //fetch schools "Vysoke" and "Stredni" schools data
      const result = await filterSkolyAction(
        {
          castObceIDs: [],
          druhSkolyIDs: druhPodskolySelected.map((druh) => druh.id),
          krajIDs: krajeSelected.map((kraj) => kraj.id),
          mestskaCastIDs: mestskeCastiSelected.map(
            (mestskaCast) => mestskaCast.id
          ),
          obecIDs: mestaSelected.map((mesto) => mesto.id),
          okresIDs: okresySelected.map((okres) => okres.id),
          oborKods: vyucovaneOborySelected.map((obor) => obor.kod as string),
          prijimaciZkouskaIDs: prijmaciZkouskySelected.map(
            (prijimaciZkouska) => prijimaciZkouska.id
          ),
          skolneRange: skolneSelected.map((skolne) => {
            return SkolneTypesData[skolne.id as keyof typeof SkolneTypesData]
              .range;
          }),
          typSkolyIDs: typySkolSelected.map((typSkoly) => typSkoly.id),
          hodnoceniRange: HodnoceniTypesData[hodnoceniSelected].range,
          offset: page * 15,
          IDs: [],
          lat: latitude,
          lon: longitude,
          limit: 15,
          nazev: undefined,
          vzdalenostMax: undefined,
        },
        {
          type: sortBy,
          lat: latitude,
          lon: longitude,
        }
      );

      // @ts-ignore
      setSkolyVysokeStredni([...skolyVysokeStredni, ...result]);

      if (result.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
    }

    if (searchingType === SearchingType.MaterskeZakladni) {
      //fetch schools "Materske" and "Zakladni" schools data
      const result = await filterSkolkyZakladkyAction(
        {
          castObceIDs: [],
          krajIDs: krajeSelected.map((kraj) => kraj.id),
          mestskaCastIDs: mestskeCastiSelected.map(
            (mestskaCast) => mestskaCast.id
          ),
          obecIDs: mestaSelected.map((mesto) => mesto.id),
          okresIDs: okresySelected.map((okres) => okres.id),

          hodnoceniRange: HodnoceniTypesData[hodnoceniSelected].range,
          offset: page * 15,
          IDs: [],
          lat: latitude,
          lon: longitude,
          limit: 15,
          nazev: undefined,
          vzdalenostMax: undefined,
          skolaDruhTypIDs: skolaDruhTypeSelected.map((druh) => druh.id),
          typZrizovateleIDs: typySkolSelected.map((typ) => typ.id),
          zarizeniIDs: [],
        },
        {
          type: sortSkolkaZakladkaBy,
          lat: latitude,
          lon: longitude,
        }
      );

      // @ts-ignore
      setSkolyZakladniMaterske([...skolyZakladniMaterske, ...result]);

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
  }, [
    krajeSelected,
    mestaSelected,
    mestskeCastiSelected,
    okresySelected,
    vyucovaneOborySelected,
    druhPodskolySelected,
    skolaDruhTypeSelected,
    typySkolSelected,
    hodnoceniSelected,
    prijmaciZkouskySelected,
    skolneSelected,
    longitude,
    latitude,
    sortBy,
    sortSkolkaZakladkaBy,
    searchingType,
  ]);

  if(!showList) return (<React.Fragment></React.Fragment>);
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
