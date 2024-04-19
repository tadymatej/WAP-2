"use server";

import { db } from "@/lib/db";
import { OptionState } from "@/state/types";
import { FilterMultiSelectWrapperType } from "./filter-types";

interface OptionsBasedOnTypeAndSearchInputProps {
  type: FilterMultiSelectWrapperType;
  searchedText: string;
}

export async function optionsBasedOnTypeAndSearch({
  type,
  searchedText,
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
    default:
      return [];
  }
}
