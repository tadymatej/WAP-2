import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterMultiSelectWrapperType } from "./filter-types";
import FilterMultiSelectWrapper from "./FilterMultiSelectWrapper";

export function FilterCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Možnosti vyhledani</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kraj" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger disabled={false} value="mesto">
              Mesto
            </TabsTrigger>
            <TabsTrigger disabled={false} value="okres">
              Okres
            </TabsTrigger>
            <TabsTrigger
              disabled={false}
              value="mestska-cast"
              className="col-span-2"
            >
              Mestska cast
            </TabsTrigger>
            <TabsTrigger disabled={false} value="kraj">
              Kraj
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mesto">
            <div className="space-y-1">
              <Label htmlFor="name">Mesto/Obec</Label>
              <FilterMultiSelectWrapper
                type={FilterMultiSelectWrapperType.Mesto}
              />
            </div>
          </TabsContent>
          <TabsContent value="okres">
            <div className="space-y-1">
              <Label htmlFor="name">Okres</Label>
              <FilterMultiSelectWrapper
                type={FilterMultiSelectWrapperType.Okres}
              />
            </div>
          </TabsContent>
          <TabsContent value="mestska-cast">
            <div className="space-y-1">
              <Label htmlFor="name">Mestska cast</Label>
              <FilterMultiSelectWrapper
                type={FilterMultiSelectWrapperType.MestskaCast}
              />
            </div>
          </TabsContent>
          <TabsContent value="kraj">
            <div className="space-y-1">
              <Label htmlFor="name">Kraj</Label>
              <FilterMultiSelectWrapper
                type={FilterMultiSelectWrapperType.Kraj}
              />
            </div>
          </TabsContent>
          {/* <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent> */}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
