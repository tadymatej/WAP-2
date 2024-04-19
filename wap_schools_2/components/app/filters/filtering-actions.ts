"use server";

import { db } from "@/lib/db";
import { FilterMultiSelectWrapperType } from "./filter-types";

interface OptionsBasedOnTypeAndSearchInputProps {
  type: FilterMultiSelectWrapperType;
  searchedText: string;
}

export async function optionsBasedOnTypeAndSearch({
  type,
  searchedText,
}: OptionsBasedOnTypeAndSearchInputProps): Promise<string[]> {
  "use server";
  switch (type) {
    case FilterMultiSelectWrapperType.Kraj: {
      const res = await db.kraj.findMany({
        where: {
          nazev: {
            contains: searchedText.length == 0 ? "" : searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
      });
      return res.map((s) => s.nazev ?? "");
    }
    case FilterMultiSelectWrapperType.Mesto: {
      const res = await db.obec.findMany({
        where: {
          nazev: {
            contains: searchedText.length == 0 ? "" : searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
      });
      return res.map((s) => s.nazev ?? "");
    }
    case FilterMultiSelectWrapperType.MestskaCast: {
      const res = await db.mestska_cast_obvod.findMany({
        where: {
          nazev: {
            contains: searchedText.length == 0 ? "" : searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
      });
      return res.map((s) => s.nazev ?? "");
    }
    case FilterMultiSelectWrapperType.Okres: {
      const res = await db.okres.findMany({
        where: {
          nazev: {
            contains: searchedText.length == 0 ? "" : searchedText,
            mode: "insensitive",
          },
        },
        orderBy: {
          nazev: "asc",
        },
      });
      return res.map((s) => s.nazev ?? "");
    }
    default:
      return [];
  }
}
