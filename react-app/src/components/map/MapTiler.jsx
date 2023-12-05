import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";
import { SideForm } from "../travelForm/SideForm";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from "maplibre-gl";
import { renderToString } from "react-dom/server";

export const MapTiler = ({
    isSideFormOpen,
    onSideFormOpen,
    onSideFormClose,
    username,
    tours,
}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const center = { lng: 0.09, lat: 15.505 };
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
        const languageParam = "en";
        const placeTypesParam = ["country", "region", "subregion", "county"];

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
            if (map.current.getLayer("markers")) {
                map.current.removeLayer("markers");
            }

            markers.forEach((markerData) => {
                const el = document.createElement("div");
                const areImages = markerData.imageUrl !== undefined;
                el.className = "marker";
                el.style.backgroundImage = areImages
                    ? `url(${markerData.imageUrl})`
                    : "url(https://travel-map-bucket.s3.eu-north-1.amazonaws.com/1701731171881-no-image.png)";
                el.style.backgroundSize = "cover";
                el.style.backgroundPosition = "50% 50%"; // Dodaj tę linię dla centrowania obrazu

                el.style.width = areImages ? "64px" : "48px";
                el.style.height = areImages ? "64px" : "48px";
                el.style.border = "2px solid #000";
                el.style.borderRadius = "50%";
                el.style.cursor = "pointer";
                // el.style.boxShadow = "4px 10px 8px rgba(0, 0, 0, 0.4)"; // Shadow effect

                const shadow = document.createElement("div");
                shadow.style.position = "absolute";
                shadow.style.bottom = "0px"; // Adjust the distance of the shadow from the bottom
                shadow.style.left = "50%";
                shadow.style.transform = "translateX(-50%)";
                shadow.style.width = "32px"; // Adjust the width of the shadow
                shadow.style.height = "8px"; // Adjust the height of the shadow
                shadow.style.boxShadow = "0 12px 8px rgba(0, 0, 0, 0.8)"; // Shadow effect
              
                shadow.style.borderRadius = "50%";
                el.appendChild(shadow);

                const arrow = document.createElement("div");
                arrow.style.position = "absolute";
                arrow.style.bottom = "-16px"; // Adjust the distance of the arrow from the bottom
                arrow.style.left = "50%";
                arrow.style.transform = "translateX(-50%)";
                arrow.style.border = "solid transparent";
                arrow.style.borderWidth = "8px";
                arrow.style.borderTopColor = "#000"; // Arrow color
                el.appendChild(arrow);
                el.addEventListener("click", () => {
                    window.alert(`Tour: ${markerData.name}`);
                });

                new maptilersdk.Marker(el)
                    .setLngLat([markerData.lng, markerData.lat])
                    .addTo(map.current);
            });
        }
    }, [markers, map.current]);

    useEffect(() => {
        handleAddMarker();
    }, [tours]);

    const handleAddMarker = () => {
        setMarkers(
            tours.map((tour) => ({
                lng: tour.coordinates[0],
                lat: tour.coordinates[1],
                imageUrl: tour.images[0],
                name: tour.name,
            }))
        );
    };

    // const handleGeocodingResultSelected = (result) => {
    //     console.log(result);
    // };
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
                    // onPick={handleGeocodingResultSelected}
                    // iconsBaseUrl="/icons" // Ustawienie ścieżki do lokalnych ikon
                />
            </Box>
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
