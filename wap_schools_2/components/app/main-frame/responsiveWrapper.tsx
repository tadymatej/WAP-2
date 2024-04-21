import { FilterContainer } from "../filters/FilterContainer";
import React, { useEffect, useState } from "react";
import { VysokaStredniVsMaterskaZakladniSelect } from "../VysokaStredniVsMaterskaZakladniSelect";
import SchoolsCard from "../school_list/SchoolsCard";
import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { EXTRA_SMALL, LARGE } from "@/state/createResponsiveState";
import { useStore } from "@/state/useStore";
import { SchoolList } from "../school_list/SchoolList";
import { SchoolListDetailContainer } from "../school_list/SchoolListDetailContainer";
import { SchoolDetail } from "../school_list/SchoolDetail";


export function ResponsiveWrapper() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setShowList = useStore((state) => state.responsive.setShowList);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setShowList(window.innerWidth > LARGE);
    };

    window.addEventListener('resize', handleResize);

  }, []);

  function renderExtraSmall() {
    return(
        <React.Fragment>
          <Header key={"header"}></Header>
          <FilterContainer></FilterContainer>
          <SchoolList></SchoolList>
          <SchoolDetail></SchoolDetail>
        </React.Fragment>
      )
  }

  function renderSmall() {
    return (
      <React.Fragment>
      <Header key={"header"}></Header>
      </React.Fragment>
    )
  }

  function renderLarge() {
    return (<React.Fragment>
      <Header key={"header"}></Header>
      <main className="h-full flex flex-col">
        <div className="flex flex-row">
          <FilterContainer></FilterContainer>
          <div className="basis-3/4 flex-grow">
            <SchoolsCard />
          </div>
        </div>
      </main>
    </React.Fragment>)
  }

  if(windowWidth <= EXTRA_SMALL) {
    return renderExtraSmall();
  } else if(windowWidth <= LARGE) {
    return renderSmall();
  } else {
    return renderLarge();
  }
}