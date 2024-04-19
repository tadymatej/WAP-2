import { db } from "@/lib/db";
import { useStore } from "@/state/useStore";

enum SkolneTypes {
  Zdarma,
  to19k,
  to21k,
  to25k,
  to32k,
  moreThan32k,
}

enum HodnoceniTypes {
  Hodnoceni0,
  Hodnoceni1,
  Hodnoceni2,
  Hodnoceni3,
  Hodnoceni4,
}

enum FilterMultiSelectWrapperType {
  //Basic options, only one is active at a time
  //kraj table, take nazev
  Kraj,
  //obec table, take nazev
  Mesto,
  //okres table,   take nazev
  Okres,
  //mestska_cast table, take nazev
  MestskaCast,

  //Advanced options, where all are active at the same time
  // Obor table, filter by kod, but take name
  VyucovaneObory,
  //typ_skoly db enum
  TypSkoly,
  PrijmaciZkousky,
  //SkolneTypes enum
  Skolne,
  //HodnoceniTypes enum
  Hodnoceni,
}

interface FilterMultiSelectWrapperProps {
  type: FilterMultiSelectWrapperType;
}

export default function FilterMultiSelectWrapper({
  type,
}: FilterMultiSelectWrapperProps) {
  const filter = useStore((state) => state.filter);
  const selectedKraje = filter.krajeSelected;

  const [searchText, setSearchText] = 

  return <div>FilterMultiSelectWrapper</div>;
}

interface OptionsBasedOnTypeAndSearchInputProps {
  type: FilterMultiSelectWrapperType;
  searchedText: string;
}

//create fuctions optionsBasdeOnTypeAndSearch that takes two
// arguments type: FilterMultiSelectWrapperType and searchedText

//create function getOptionsBasedOnType that takes two arguments
// type: FilterMultiSelectWrapperType and searchedText

export async function optionsBasedOnTypeAndSearch({
  type,
  searchedText,
}: OptionsBasedOnTypeAndSearchInputProps) {
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
      return res.map((s) => s.nazev);
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
      return res.map((s) => s.nazev);
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
      return res.map((s) => s.nazev);
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
      return res.map((s) => s.nazev);
    }
    default:
      return [];
  }
}
