import { Card, CardContent } from "@/components/ui/card";
import { SchoolAllData } from "@/types/db-extra-types";

interface SchoolTileProps {
  school: SchoolAllData;
}

export default function SchoolTile({ school }: SchoolTileProps) {
  const schoolTypes = school.typ_skoly;
  return (
    <Card>
      <CardContent></CardContent>
    </Card>
  );
}
