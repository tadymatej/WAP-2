import { Button } from "@/components/ui/button";
import { useStore } from "@/state/useStore";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface LocationSectionProps {
  schoolLatitude: number | undefined;
  schoolLongitude: number | undefined;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function LocationSection({
  schoolLatitude,
  schoolLongitude,
}: LocationSectionProps) {
  const [showPath, setShowPath] = useState(false);
  const userLatitude = useStore((state) => state.filter.latitude);
  const userLongitude = useStore((state) => state.filter.longitude);

  console.log("schoolLatitude", schoolLatitude);
  console.log("schoolLongitude", schoolLongitude);
  console.log("userLatitude", userLatitude);
  console.log("userLongitude", userLongitude);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCbqCg_gtkDa48oTFEDuaZXx6pvr8B49DI",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState<number>(12);

  const center = {
    lat: schoolLatitude ?? 49,
    lng: schoolLongitude ?? 16,
  };

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },

    [center]
  );

  const onLoad2 = useCallback(
    function callback() {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: {
            lat: userLatitude ?? 49,
            lng: userLongitude ?? 16,
          },
          destination: {
            lat: schoolLatitude ?? 49,
            lng: schoolLongitude ?? 16,
          },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
    [schoolLatitude, schoolLongitude, userLatitude, userLongitude]
  );

  useEffect(() => {
    setTimeout(() => {
      setZoom(14);
    }, 300);
    if (map) onLoad2();
  }, [showPath, onLoad2, map]);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-slate-600 font-semibold text-xl text-start flex-1">
          {showPath ? "Trasa" : "Poloha"}
        </div>
        <div className="flex flex-row">
          <Button onClick={() => setShowPath(!showPath)}>
            <Plus size={20} />
          </Button>

          {/*<div className="w-2" />
        <Button variant="outline">Napsat hodnoceni</Button>*/}
        </div>
      </div>
      <div className="h-6" />
      {showPath ? (
        userLatitude && userLongitude && schoolLatitude && schoolLongitude ? (
          <div className="text-slate-600 font-normal text-base text-center">
            <div className="pt-4 rounded-sm w-100">
              {isLoaded && (
                <GoogleMap
                  mapContainerClassName="rounded-xl w-100"
                  mapContainerStyle={containerStyle}
                  center={center}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={() => {}}
                  zoom={zoom}
                  options={{ fullscreenControl: false }}
                >
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              )}
            </div>
          </div>
        ) : (
          <div className="text-slate-600 font-normal text-base text-center">
            Není možné zobrazit trasu.
          </div>
        )
      ) : schoolLatitude && schoolLongitude ? (
        <div className="text-slate-600 font-normal text-base text-center">
          {isLoaded && (
            <GoogleMap
              mapContainerClassName="rounded-xl w-100"
              mapContainerStyle={containerStyle}
              center={center}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={() => {}}
              zoom={zoom}
              options={{ fullscreenControl: false }}
            >
              <Marker
                position={{
                  lat: schoolLatitude,
                  lng: schoolLongitude,
                }}
              />
            </GoogleMap>
          )}
        </div>
      ) : (
        <div className="text-slate-600 font-normal text-base text-center">
          Není možné zobrazit polohu školky.
        </div>
      )}
    </div>
  );
}

{
  /*<div className="text-slate-600 font-normal text-base text-center">
          Tato školka zatím nemá žádná hodnocení.
        </div>*/
}
