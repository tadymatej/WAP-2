"use client";

import { useStore } from "@/state/useStore";
import { useEffect } from "react";
import { ResponsiveWrapper } from "./responsiveWrapper";

/**
 * Renders the main frame of the application.
 * @returns The JSX element representing the main frame.
 */
export function MainFrame() {
  const setShowFilter = useStore((state) => state.filter.setShowFilter);

  //Check on init if screen is bigger than 1024px px set showFilter to true
  useEffect(() => {
    setShowFilter(true);
    console.log("Setting to default");
  }, [setShowFilter]);

  return <ResponsiveWrapper></ResponsiveWrapper>;
}
