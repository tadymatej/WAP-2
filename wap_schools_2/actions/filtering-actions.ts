"use server";

import { db } from "@/lib/db";
import { FilterStateDefinition, OptionState } from "@/state/types";
import {
  FilterMultiSelectWrapperType,
  SkolneTypesData,
  SkolneTypesValues,
} from "../enums/filter-types";

interface OptionsBasedOnTypeAndSearchInputProps {
  type: FilterMultiSelectWrapperType;
  searchedText: string;
  filterState: FilterStateDefinition;
}

export async function optionsBasedOnTypeAndSearch({
  type,
  searchedText,
  filterState,
}: OptionsBasedOnTypeAndSearchInputProps): Promise<OptionState[]> {
  "use server";
  switch (type) {
    case FilterMultiSelectWrapperType.Kraj: {
      const res = await db.kraj.findMany({
        where: {
          nazev: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
        take: 50,
      });
      return res.map((s) => ({
        nazev: s.nazev ?? "",
        id: s.id,
      }));
    }
    case FilterMultiSelectWrapperType.Mesto: {
      const res = await db.obec.findMany({
        where: {
          nazev: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        include: {
          okres: {
            select: {
              nazev: true,
            },
          },
        },
        orderBy: {
          nazev: "asc",
        },
        take: 50,
      });
      return res.map((s) => ({
        nazev: (s.nazev ?? "") + " - " + (s.okres?.nazev ?? ""),
        id: s.id,
      }));
    }
    case FilterMultiSelectWrapperType.MestskaCast: {
      const res = await db.mestska_cast_obvod.findMany({
        where: {
          nazev: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
        take: 50,
      });
      return res.map((s) => ({
        nazev: s.nazev ?? "",
        id: s.id,
      }));
    }
    case FilterMultiSelectWrapperType.Okres: {
      const res = await db.okres.findMany({
        where: {
          nazev: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
        take: 50,
      });
      return res.map((s) => ({
        nazev: s.nazev ?? "",
        id: s.id,
      }));
    }

    //Advanced options where each options is limited by the selection above. At once only
    // One of the above is active.
    // Here can all be active at the same time and all limit each other
    case FilterMultiSelectWrapperType.VyucovaneObory: {
      const allOptions = await db.obor.findMany({
        where: {
          nazevoboru: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        select: {
          nazevoboru: true,
          id: true,
        },
        take: 50,
        distinct: ["nazevoboru"],
      });

      return allOptions.map((s) => ({
        nazev: s.nazevoboru ?? "",
        id: s.id,
      }));
    }

    case FilterMultiSelectWrapperType.PrijmaciZkousky: {
      const allOptions = await db.prijimaci_zkouska.findMany({
        where: {
          nazev: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        select: {
          nazev: true,
          id: true,
        },

        distinct: ["nazev"],
      });

      return allOptions.map((s) => ({
        nazev: s.nazev ?? "",
        id: s.id,
      }));
    }

    case FilterMultiSelectWrapperType.TypSkoly: {
      const allOptions = await db.typ_skoly.findMany({
        where: {
          nazev: {
            contains: searchedText,
            mode: "insensitive",
          },
        },
        select: {
          nazev: true,
          id: true,
        },
        distinct: ["nazev"],
      });

      return allOptions.map((s) => ({
        nazev: s.nazev ?? "",
        id: s.id,
      }));
    }

    case FilterMultiSelectWrapperType.Skolne: {
      return SkolneTypesValues.map((s, index) => {
        const a = SkolneTypesData[s];
        return {
          nazev: a.desc,
          id: s as number,
        };
      });
    }
  }
}
