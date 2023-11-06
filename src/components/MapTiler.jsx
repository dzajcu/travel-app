import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";
import { SideForm } from "./SideForm";

export const MapTiler = ({ isSideFormOpen, onSideFormOpen, onSideFormClose }) => {
    const toggleForm = () => {
        isSideFormOpen ? onSideFormClose() : onSideFormOpen();
    };

    const mapContainer = useRef(null);
    const map = useRef(null);
    const center = { lng: 0.09, lat: 35.505 };
    const [zoom] = useState(2);
    const [pitch] = useState(20);
    maptilersdk.config.apiKey = "c0INjuLdY67UWNA3CrGB";

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ,
            center: [center.lng, center.lat],
            zoom: zoom,
            pitch: pitch,
            logoPosition: "bottom-right",
        });
    }, [center.lng, center.lat, zoom]);

    return (
        <Box pos="absolute" zIndex="1">
            <div ref={mapContainer} className="map" onClick={toggleForm} />
            <SideForm
                isSideFormOpen={isSideFormOpen}
                onSideFormClose={onSideFormClose}
                toggleForm={toggleForm}
            />
        </Box>
    );
};
