import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";
import { GeocodingControl } from "@maptiler/geocoding-control/react";

export const SearchBarControl = ({
    mapController,
    setPlace,
    setCoordinates,
}) => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const handleGeocodingResultSelected = (result) => {
        if (result?.place_name_en.includes(",")) setPlace(result?.place_name_en);
        setCoordinates(result?.center);
    };

    return (
        <Box className="geocoding-control-form" width="100%">
            <GeocodingControl
                apiKey={apiKey}
                mapController={mapController}
                language="en"
                placeholder="Enter place"
                // types={[
                //     "country",
                //     "region",
                //     "subregion",
                //     "county",
                //     "municipality",
                //     "locality",
                // ]}
                onPick={handleGeocodingResultSelected}
            />
        </Box>
    );
};
