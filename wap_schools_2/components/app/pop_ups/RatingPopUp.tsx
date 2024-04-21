"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { TypRoleUzivateleFilterModel } from "@/repositories/filterModels/typRoleUzivateleFilterModel";
import { insertHodnoceni } from "@/repositories/hodnoceniRepository";
import { getTypRoleUzivateleiList } from "@/repositories/typRoleUzivateleRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Stars } from "./Stars";

import { hodnoceni, typ_role_uzivatele } from "@prisma/client";

const FormSchema = z.object({
  jinaRoleUzivatele: z.string().optional(),
  popis: z.string().optional(),
  autor: z.string().optional(),
  typRoleUzivateleID: z.string({
    required_error: "Zvolte prosím svůj vztah ke škole",
  }),
  hvezdicek: z.string({
    required_error: "Zvolte prosím hodnocení školy",
  }),
});

interface RatingPopUpProps {
  skolaID: number | null;
  skolkaZakladkaID: number | null;
}

export function RatingPopUp(props: RatingPopUpProps) {
  const possibleRatings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hvezdicek: "5",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let model: hodnoceni = {
      popis: data.popis === undefined ? null : data.popis,
      autor: data.autor === undefined ? null : data.autor,
      skolaid: props.skolaID,
      skolkazakladkaid: props.skolkaZakladkaID,
      hvezdicek: parseFloat(data.hvezdicek) * 10,
    } as hodnoceni;
    let typRoleUzivateleID = parseInt(data.typRoleUzivateleID);
    if (typRoleUzivateleID != -1) model.jinaroleuzivatele = null;
    else
      model.jinaroleuzivatele =
        data.jinaRoleUzivatele == undefined ? null : data.jinaRoleUzivatele;
    let res = await insertHodnoceni(model);
    toast({
      title:
        res == true
          ? "Vaše hodnocení bylo uloženo. "
          : "Při odesílání hodnocení nastala chyba, prosíme, zkuste to znovu později. ",
    });
  }

  function handleSelectVztahKeSkoleChange(value: string) {
    if (parseInt(value) == -1) setIsSelectedVztahJine(true);
    else setIsSelectedVztahJine(false);
  }

  const [isSelectedVztahJine, setIsSelectedVztahJine] = useState(false);
  const [possibleVztahKeSkoleArray, setPossibleVztahKeSkoleArray]: [
    typ_role_uzivatele[],
    any
  ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getTypRoleUzivateleiList(
        {} as TypRoleUzivateleFilterModel
      );
      fetchData();
    };
  }, []);

  return (
    <>
      <CardHeader className="p-0 pb-2">
        <CardTitle>Přidat hodnocení</CardTitle>
        <CardDescription>
          Sdělte ostatním, jaké máte zkušenosti s touto školou...
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-100 space-y-6 flex flex-wrap flex-col"
        >
          <FormField
            control={form.control}
            name="typRoleUzivateleID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Váš vztah vůči škole</FormLabel>
                <Select
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    handleSelectVztahKeSkoleChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {possibleVztahKeSkoleArray.map((item) => {
                      let key = (item.id as number).toString();
                      return (
                        <SelectItem value={key} key={key}>
                          {item.nazev}
                        </SelectItem>
                      );
                    })}
                    <SelectItem value="-1">Jiný</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSelectedVztahJine && (
            <FormField
              name="jinaRoleUzivatele"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Váš vztah vůči škole</FormLabel>
                  <Input
                    onChange={field.onChange}
                    type="text"
                    placeholder="Např: Školník, Prarodič, ..."
                  ></Input>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="hvezdicek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zvolte hodnocení školy</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {possibleRatings.map((rating) => {
                      return (
                        <SelectItem
                          key={"ranking-" + rating}
                          className="h-fit"
                          value={rating.toString()}
                        >
                          <div className="flex items-center">
                            <div className="p-2 min-w-12">{rating * 20} %</div>
                            <div className="flex">
                              <Stars count={rating}></Stars>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="border-b-1 border-primary/10" />
          <FormField
            name="popis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Váš komentář k hodnocení</FormLabel>
                <Textarea
                  onChange={field.onChange}
                  placeholder="Tuto školu hodnotím pozitivně, protože ..."
                ></Textarea>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="autor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaše jméno</FormLabel>
                <Input
                  onChange={field.onChange}
                  type="text"
                  placeholder="Anonymní uživatel"
                ></Input>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="max-w-max self-end" type="submit">
            Uložit hodnocení
          </Button>
        </form>
      </Form>
    </>
  );
}
