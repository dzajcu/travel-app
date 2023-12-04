import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box, Button } from "@chakra-ui/react";
import { SideForm } from "../travelForm/SideForm";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from "maplibre-gl";
import { renderToString } from "react-dom/server";

// import "maplibre-gl/dist/maplibre-gl.css";

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
        // Check if the map is initialized before adding markers
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
    }, [markers, map.current]);

    // Ensure that handleAddMarker runs whenever the tours prop changes
    useEffect(() => {
        handleAddMarker();
    }, [tours]);
    const handleAddMarker = () => {
        // Dodaj nowy marker do stanu na podstawie danych z tours
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            ...tours.map((tour) => ({
                lng: tour.coordinates[0], // Assuming coordinates are [lat, lng]
                lat: tour.coordinates[1],
                imageUrl:
                    "https://travel-map-bucket.s3.eu-north-1.amazonaws.com/1701634278178-Designer.jpeg",
            })),
        ]);
    };

    const createCustomMarkerElement = (imageUrl) => {
        const markerStyle = {
            width: "64px",
            height: "64px",
            borderRadius: "full",
            // backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "2px solid white",
            outline: "none",
            cursor: "pointer",
            transition: "transform 0.3s ease",
        };

        const markerHtml = renderToString(
            <div
                as="button"
                style={markerStyle}
                onMouseEnter={() => {
                    document.getElementById("custom-marker").style.transform =
                        "translate(15px)";
                    document.getElementById("custom-marker").style.boxShadow = "sm";
                    document.getElementById("custom-marker").style.zIndex = 2;
                }}
                onMouseLeave={() => {
                    document.getElementById("custom-marker").style.transform =
                        "translate(0)";
                    document.getElementById("custom-marker").style.boxShadow =
                        "none";
                    document.getElementById("custom-marker").style.zIndex = 1;
                }}
                id="custom-marker"
            />
        );

        return markerHtml;
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
