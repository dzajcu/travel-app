import { useEffect, useRef, useState } from "react";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@chakra-ui/react";

export default function SearchBar() {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const mapContainerRef = useRef(null);

    const [mapController, setMapController] = useState();

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        const map = new maplibregl.Map({
            style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
            container: mapContainerRef.current,
        });

        setMapController(createMapLibreGlMapController(map, maplibregl));
    }, []);

    return (
        <Box zIndex="9999">
            <GeocodingControl apiKey={apiKey} mapController={mapController} />

            <div
                ref={mapContainerRef}
                style={{ width: "800px", height: "600px", marginTop: "8px" }}
            />
        </Box>
    );
}
