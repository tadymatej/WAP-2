"use client";
import { debounce } from "lodash";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useStore } from "@/state/useStore";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterMultiSelectWrapperType } from "./filter-types";
import { optionsBasedOnTypeAndSearch } from "./filtering-actions";

interface FilterMultiSelectWrapperProps {
  type: FilterMultiSelectWrapperType;
}

export default function FilterMultiSelectWrapper({
  type,
}: FilterMultiSelectWrapperProps) {
  const filter = useStore((state) => state.filter);
  //For kraje get filter.selectedKraje, for obce get filter.selectedObce
  //for okresy get filter.selectedOkresy, for mestskeCasti get filter.selectedMestskeCasti
  //for obory get filter.selectedObory, for typSkoly get filter.selectedTypSkoly

  const getSelected = (type: FilterMultiSelectWrapperType): string[] => {
    switch (type) {
      case FilterMultiSelectWrapperType.Kraj: {
        return filter.krajeSelected;
      }
      case FilterMultiSelectWrapperType.Mesto: {
        return filter.mestaSelected;
      }
      case FilterMultiSelectWrapperType.MestskaCast: {
        return filter.mestskeCastiSelected;
      }
      case FilterMultiSelectWrapperType.Okres: {
        return filter.okresySelected;
      }
      default: {
        return [];
      }
    }
  };

  const getTitleBase = (type: FilterMultiSelectWrapperType): string => {
    switch (type) {
      case FilterMultiSelectWrapperType.Kraj: {
        return "kraje";
      }
      case FilterMultiSelectWrapperType.Mesto: {
        return "mesta";
      }
      case FilterMultiSelectWrapperType.MestskaCast: {
        return "mestske casti";
      }
      case FilterMultiSelectWrapperType.Okres: {
        return "okresy";
      }
      default: {
        return "";
      }
    }
  };

  const getName = (type: FilterMultiSelectWrapperType): string => {
    switch (type) {
      case FilterMultiSelectWrapperType.Kraj: {
        return "Kraje";
      }
      case FilterMultiSelectWrapperType.Mesto: {
        return "Mesta";
      }
      case FilterMultiSelectWrapperType.MestskaCast: {
        return "Mestske casti";
      }
      case FilterMultiSelectWrapperType.Okres: {
        return "Okresy";
      }
      default: {
        return "";
      }
    }
  };

  const selected = getSelected(type);
  const searchingPlaceholder = "Vyhledat " + getTitleBase(type) + "...";
  const defaultText = "Vyberte " + getTitleBase(type);
  const name = getName(type);

  const [open, setOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const setInState = (values: string[]) => {
    switch (type) {
      case FilterMultiSelectWrapperType.Kraj: {
        filter.setKraje(values);
        break;
      }
      case FilterMultiSelectWrapperType.Mesto: {
        filter.setMesta(values);
        break;
      }
      case FilterMultiSelectWrapperType.MestskaCast: {
        filter.setMestskeCasti(values);
        break;
      }
      case FilterMultiSelectWrapperType.Okres: {
        filter.setOkresy(values);
        break;
      }
      default: {
        console.log("Unknown type");
      }
    }
  };

  useEffect(() => {
    // Create a debounced version of fetchOptions
    const debouncedFetchOptions = debounce(async () => {
      const result = await optionsBasedOnTypeAndSearch({
        type,
        searchedText: searchText,
      });
      setOptions(result);
    }, 200); // Wait 300ms after the last call to run the function

    // Call the debounced version of fetchOptions
    debouncedFetchOptions();

    // Cleanup function to cancel any pending debounced function calls
    return () => {
      debouncedFetchOptions.cancel();
    };
  }, [type, searchText]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between flex flex-row items-center"
          aria-expanded={open}
          aria-label="Select Department"
        >
          <div className="flex w-full flex-row justify-between">
            <div>{name}</div>
            <div className="w-4" />
            {selected.length > 0 && (
              <>
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selected.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selected.length > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selected.length} selected
                    </Badge>
                  ) : (
                    selected.map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchText}
            onValueChange={setSearchText}
            placeholder={searchingPlaceholder}
          />
          <CommandList>
            <ScrollArea
              className={"[&>[data-radix-scroll-area-viewport]]:max-h-[300px]"}
            >
              <CommandEmpty>No department found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected.includes(option);

                  return (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={(currentValue) => {
                        if (isSelected) {
                          setInState(
                            selected.filter((s) => s !== currentValue)
                          );
                        } else {
                          setInState([...selected, currentValue]);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>

                      <span>{option}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

//create fuctions optionsBasdeOnTypeAndSearch that takes two
// arguments type: FilterMultiSelectWrapperType and searchedText

//create function getOptionsBasedOnType that takes two arguments
// type: FilterMultiSelectWrapperType and searchedText
