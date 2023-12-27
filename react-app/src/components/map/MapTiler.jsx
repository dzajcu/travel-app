import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";
import { SideForm } from "../travelForm/SideForm";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from "maplibre-gl";

export const MapTiler = ({
    isSideFormOpen,
    onSideFormOpen,
    onSideFormClose,
    setTours,
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
        const currentMap = map.current;
    
        if (currentMap && markers) {
            const popup = new maptilersdk.Popup({
                closeButton: false,
                closeOnClick: false,
                className: "custom-popup mapboxgl-popup-dark",
            });
    
            markers.forEach((markerData) => {
                const el = document.createElement("div");
                const areImages = markerData.imageUrl !== undefined;
    const isValidLngLat = !isNaN(parseFloat(markerData.lng)) && !isNaN(parseFloat(markerData.lat));

            if (isValidLngLat) {
                el.addEventListener("mouseenter", () => {
                    const popupContent = `<p>${markerData.name}</p>`;
    
                    const markerHeight = areImages ? 64 : 48;
                    const popupOffset = 10;
                    
                    popup
                        .setLngLat([markerData.lng, markerData.lat])
                        .setHTML(popupContent)
                        .setOffset([0, -markerHeight - popupOffset])
                        .addTo(currentMap);
                });
    
                el.addEventListener("mouseleave", () => {
                    currentMap.getCanvas().style.cursor = "";
                    popup.remove();
                });

                el.className = "marker";
                el.style.backgroundImage = areImages
                    ? `url(${markerData.imageUrl})`
                    : `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6))`;
                el.style.backgroundSize = "cover";
                el.style.backgroundPosition = "50% 50%";

                el.style.width = areImages ? "64px" : "48px";
                el.style.height = areImages ? "64px" : "48px";
                el.style.border = "2px solid #222222";
                el.style.borderRadius = "50%";
                el.style.cursor = "pointer";
                el.style.marginTop = areImages ? "-40px" : "-32px";
                el.style.boxShadow = "10px 10px 8px rgba(0, 0, 0, 0.4)";

                const shadow = document.createElement("div");
                shadow.style.position = "absolute";
                shadow.style.bottom = "0px";
                shadow.style.left = "50%";
                shadow.style.transform = "translateX(-50%)";
                shadow.style.width = "32px";
                shadow.style.height = "8px";
                shadow.style.boxShadow = "0 12px 8px rgba(0, 0, 0, 0.8)";
                shadow.style.borderRadius = "50%";
                el.appendChild(shadow);

                const arrow = document.createElement("div");
                arrow.style.position = "absolute";
                arrow.style.bottom = "-16px";
                arrow.style.left = "50%";
                arrow.style.transform = "translateX(-50%)";
                arrow.style.border = "solid transparent";
                arrow.style.borderWidth = "8px";
                arrow.style.borderTopColor = "#000";
                arrow.style.zIndex = "-50";
                el.appendChild(arrow);
                el.addEventListener("click", () => {
                    window.alert(`Tour: ${markerData.name}`);
                });
                new maptilersdk.Marker(el)
                    .setLngLat([markerData.lng, markerData.lat])
                    .addTo(map.current);
            }});
        }
    }, [markers, map.current]);

    useEffect(() => {
        handleAddMarker();
    }, [tours]);

    const handleAddMarker = () => {
        if (!tours) return;
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            ...(tours?.map((tour) => ({
                lng: tour?.coordinates?.[0],
                lat: tour?.coordinates?.[1],
                imageUrl: tour?.images?.[0],
                name: tour?.placeName,
            })) || []),
        ]);
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
                    // iconsBaseUrl="/icons"
                />
            </Box>
            <div ref={mapContainer} className="map" />
            <SideForm
                isSideFormOpen={isSideFormOpen}
                onSideFormClose={onSideFormClose}
                mapController={mapController}
                setTours={setTours}
            />
        </Box>
    );
};
