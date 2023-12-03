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
import { SearchBarControl } from "./SearchBarControl";
export const MapTiler = ({ isSideFormOpen, onSideFormOpen, onSideFormClose, username }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const center = { lng: 0.09, lat: 15.505 };
    // const [zoom] = useState(1.85);
    const [zoom] = useState(3);
    const [pitch] = useState(30);
    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const [mapController, setMapController] = useState();
    const [markers, setMarkers] = useState([]);

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

    useEffect(() => {
        if (map.current) return;
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            // style: maptilersdk.MapStyle.BRIGHT.PASTEL
            style: maptilersdk.MapStyle.TOPO,
            language: "en",
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

    useEffect(() => {
        if (map.current) {
            // Usuń wszystkie istniejące markery z mapy przed dodaniem nowych
            if (map.current.getLayer("markers")) {
                map.current.removeLayer("markers");
            }

            // Dodaj nowe markery do mapy
            markers.forEach((markerData) => {
                const marker = new maptilersdk.Marker({ color: "#FF0000" })
                    .setLngLat([markerData.lng, markerData.lat])
                    .addTo(map.current);

                // Dodaj niestandardową ikonę do markera
                marker.getElement().innerHTML = createCustomMarkerElement(
                    markerData.imageUrl
                );
            });
        }
    }, [markers]);
    const handleAddMarker = () => {
        // Dodaj nowy marker do stanu
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
                lng: Math.random() * 360 - 180,
                lat: Math.random() * 180 - 90,
                imageUrl:
                    "https://cdn.pixabay.com/photo/2023/11/04/04/45/woman-8364265_1280.jpg",
            },
        ]);
    };
    const createCustomMarkerElement = (imageUrl) => {
        return `<img src="${imageUrl}" alt="Custom Marker" style="width: 32px; height: 32px;" />`;
    };

    const handleGeocodingResultSelected = (result) => {
        console.log(result);
    };
    return (
        <Box pos="absolute" zIndex="1">
            <Box
                className="geocoding-control-map"
                pos="absolute"
                top="16px"
                left={{ base: "16px", md: "220px" }}
            >
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
                        "municipal_district",
                        "locality",
                    ]}
                    placeholder="Search for a place..."
                    onPick={handleGeocodingResultSelected}
                    // iconsBaseUrl="/icons" // Ustawienie ścieżki do lokalnych ikon
                />
                {/*<Button onClick={handleAddMarker} ml="300" />*/}
            </Box>
            {/* <SearchBarControl
                mapController={mapController}
                apiKey={maptilersdk.config.apiKey}
            /> */}

            <div ref={mapContainer} className="map" />
            <SideForm
                isSideFormOpen={isSideFormOpen}
                onSideFormClose={onSideFormClose}
                mapController={mapController}
                username={username}
            />
        </Box>
    );
};
