import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FilterCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Možnosti vyhledani</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Tabs
            defaultValue="account"
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="default">Account</TabsTrigger>
              <TabsTrigger value="advanced">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="default">
              <div className="space-y-1">
                <Label htmlFor="name">Kraj</Label>
                <Input
                  id="name"
                  defaultValue="Vsechny kraje"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                />
              </div>
            </TabsContent>
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input
                      id="current"
                      type="password"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input
                      id="new"
                      type="password"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
