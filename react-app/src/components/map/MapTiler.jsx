import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";
import { SideForm } from "../travelForm/SideForm";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@chakra-ui/react";
import handleMapClick from "./handleMapClick";
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
    const handleClick = async (e) => {
        e.preventDefault();
        await handleMapClick();
    };
    return (
        <Box pos="absolute" zIndex="1">
            <Box pos="absolute" zIndex="9999" top={"5"} left={"230"}>
                <GeocodingControl
                    apiKey={maptilersdk.config.apiKey}
                    mapController={mapController}
                />
            </Box>

            <div ref={mapContainer} className="map" />
            <SideForm
                isSideFormOpen={isSideFormOpen}
                onSideFormClose={onSideFormClose}
            />
        </Box>
    );
};
