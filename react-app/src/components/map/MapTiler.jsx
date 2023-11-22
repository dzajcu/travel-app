import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";
import { SideForm } from "../travelForm/SideForm";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@chakra-ui/react";
export const MapTiler = ({ isSideFormOpen, onSideFormOpen, onSideFormClose }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const center = { lng: 0.09, lat: 15.505 };
    const [zoom] = useState(1.85);
    const [pitch] = useState(30);
    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const [mapController, setMapController] = useState();

    const isChildOf = (child, parent) => {
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    const handleClick = () => {
        const baseUrl = "https://api.maptiler.com/geocoding/";
        const searchTerm = encodeURIComponent("berlin");
        const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
        const languageParam = "en"; // Specify the language parameter as "en" for English
        const placeTypesParam = ["country", "region", "subregion", "county"]; // Specify the place types to search for

        const url = `${baseUrl}${searchTerm}.json?key=${apiKey}&language=${languageParam}&types=${placeTypesParam.join(
            ","
        )}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const results = data.features.map((feature) => ({
                    lat: feature.center[0],
                    lon: feature.center[1],
                    name: feature.place_name,
                }));
                console.log(results);
                // Your code continues here
            })
            .catch((error) => {
                console.error("Error fetching results:", error);
            });
    };
    const handleGeocodeSearch = (results) => {
        // Odczytaj pierwszy kliknięty wynik
        const firstResult = results[0];
        if (firstResult) {
            console.log("Pierwszy kliknięty wynik:", firstResult);
            // Tutaj możesz dodać kod obsługi dla pierwszego wyniku
        }
    };

    useEffect(() => {
        if (mapController) {
            // Ustawienie obsługi zdarzenia geokodowania na mapController
            mapController.setEventHandler((event) => {
                if (event.type === "markerClick") {
                    // Tutaj możesz obsługiwać kliknięcia w markery
                    console.log("Marker kliknięty:", event.id);
                }
                // Dodaj inne przypadki zdarzeń, które chcesz obsłużyć
            });
        }
    }, [mapController]);

    useEffect(() => {
        if (map.current) return;
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ,
            center: [center.lng, center.lat],
            zoom: zoom,
            pitch: pitch,
            logoPosition: "bottom-right",
            scaleControl: true,
            maxPitch: 60,
        });

        mapContainer.current.addEventListener("click", (event) => {
            const controls = map.current._controlContainer;
            !isChildOf(event.target, controls) && onSideFormOpen();
        });
        setMapController(createMapLibreGlMapController(map.current, maplibregl));
    }, [center.lng, center.lat, zoom]);
    const handleGeocodingResultSelected = (result) => {
        console.log(result);
    };
    return (
        <Box pos="absolute" zIndex="1">
            <Box pos="absolute" zIndex="9999" top={"16px"} left={"220"}>
                <GeocodingControl
                    apiKey={maptilersdk.config.apiKey}
                    mapController={mapController}
                    language="en"
                    types={[
                        "country",
                        "region",
                        "subregion",
                        "county",
                        "municipality",
                        "locality",
                    ]}
                    onPick={handleGeocodingResultSelected}
                />
                <Button onClick={handleClick} ml="300" />
            </Box>

            <div ref={mapContainer} className="map" />
            <SideForm
                isSideFormOpen={isSideFormOpen}
                onSideFormClose={onSideFormClose}
            />
        </Box>
    );
};
