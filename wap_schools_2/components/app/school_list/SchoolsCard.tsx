"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { SearchingType } from "@/enums/filter-types";
import { cn } from "@/lib/utils";
import { SkolaOrderByEnum } from "@/repositories/orderByTypes/skolaOrderByTypes";
import { SkolaSortByMap } from "@/state/types";
import { useStore } from "@/state/useStore";
import React from "react";
import { LocationPopUp } from "../pop_ups/LocationPopUp";
import { SchoolList } from "./SchoolList";
import SkolaVysokaStredniDetail from "./SkolaVysokaStredniDetail";
import SkolaZakladniMaterskaDetail from "./SkolaZakladniMaterskaDetail";
import { SchoolListHeader } from "./SchoolListHeader";
import { SchoolDetail } from "./SchoolDetail";
import { SchoolListDetailContainer } from "./SchoolListDetailContainer";

export interface SchoolsCardProps {}

export default function SchoolsCard() {

  return (
    <React.Fragment>
      <Card className=" col-span-6 w-full">
        <CardContent className="pt-4 grid grid-cols-2">
          <SchoolListDetailContainer></SchoolListDetailContainer>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
