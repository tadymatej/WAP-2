"use client";

import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/state/useStore";
import React, { useEffect, useState } from "react";
import SchoolsCard from "../school_list/SchoolsCard";
import { VysokaStredniVsMaterskaZakladniSelect } from "../VysokaStredniVsMaterskaZakladniSelect";
import { FilterContainer } from "../filters/FilterContainer";
import { ResponsiveWrapper } from "./responsiveWrapper";

export function MainFrame() {
  const setShowFilter = useStore((state) => state.filter.setShowFilter);

  //Check on init if screen is bigger than 1024px px set showFilter to true
  useEffect(() => {
      setShowFilter(true);
    console.log("Setting to default");
  }, [setShowFilter]);

  return (
    <ResponsiveWrapper></ResponsiveWrapper>
  );
}
