import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

interface LocationSectionProps {
  schoolLatitude: number | undefined;
  schoolLongitude: number | undefined;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

/**
 * Renders the location section of the school list.
 */
export default function LocationSection({
  schoolLatitude,
  schoolLongitude,
}: LocationSectionProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCbqCg_gtkDa48oTFEDuaZXx6pvr8B49DI",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = {
    lat: schoolLatitude ?? 49,
    lng: schoolLongitude ?? 16,
  };

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      //map.fitBounds(bounds);

      setMap(map);
    },

    [center]
  );

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-slate-600 font-semibold text-xl text-start flex-1">
          Poloha
        </div>
      </div>
      <div className="h-6" />
      {schoolLatitude && schoolLongitude ? (
        <div className="text-slate-600 font-normal text-base text-center">
          {isLoaded && (
            <GoogleMap
              mapContainerClassName="rounded-xl w-100"
              mapContainerStyle={containerStyle}
              center={center}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={() => {}}
              zoom={15}
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
          Není možné zobrazit polohu školky, protože buď školka nemá polohu,
          nebo nejste přepnuti na vyhledáváni podle vzdálenosti.
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
