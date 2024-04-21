"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { LocateFixed } from "lucide-react";
import React, { useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 49,
  lng: 16,
};

export interface LocationPopUpProps {
  onSave: (lat: number, lon: number) => void;
  className?: string;
}

export function LocationPopUp(props: LocationPopUpProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCbqCg_gtkDa48oTFEDuaZXx6pvr8B49DI",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [lat, setLat] = React.useState<number>(49);
  const [lon, setLon] = React.useState<number>(16);
  const [zoom, setZoom] = React.useState<number>(12);

  useEffect(() => {
    setTimeout(() => {
      setZoom(9);
    }, 300);
  }, []);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  function onClick(e: google.maps.MapMouseEvent) {
    if (e.latLng?.lat() !== undefined) setLat(e.latLng?.lat());
    if (e.latLng?.lng() !== undefined) setLon(e.latLng?.lng());
  }

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  function onSetActualPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  return (
    <>
      <DialogHeader>
        <CardTitle>Vyberte lokaci</CardTitle>
        <CardDescription>
          Zvolte lokaci pro nalezení nejbližších škol...
        </CardDescription>
      </DialogHeader>
      {/*<CardContent>*/}
      <div>
        <Button
          className="flex flex-row"
          variant="outline"
          onClick={onSetActualPosition}
        >
          <LocateFixed className="w-5 h-5"></LocateFixed>
          <div className="w-2" />
          <span className="pl-2">Premistit na aktualni polohu</span>
        </Button>
      </div>
      <div className="grid grid-rows-1 pt-4">
        <Separator className="border-b-1 col-span-1"></Separator>
        <span className="pl-2 pr-2 lt-2 text-sm text-primary/50 text-center -mt-3 bg-white w-max center self-end ml-auto mr-auto">
          Nebo
        </span>
      </div>
      <div className="pt-4 rounded-sm w-100">
        {isLoaded && (
          <GoogleMap
            mapContainerClassName="rounded-xl w-100"
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onClick}
            zoom={zoom}
            options={{ fullscreenControl: false }}
          >
            <Marker
              position={{
                lat: lat,
                lng: lon,
              }}
            />
          </GoogleMap>
        )}
      </div>
      <div className="h-4" />
      {/*</CardContent>*/}
      <DialogFooter className="flex justify-end">
        <Button
          onClick={() => props.onSave(lat, lon)}
          className="justify-self-end"
        >
          Vybrat lokaci
        </Button>
      </DialogFooter>
    </>
  );
}
