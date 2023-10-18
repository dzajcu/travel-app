import { Box } from "@chakra-ui/react";
import React from "react";
import MainMap from "./MainMap";
import Statistics from "./Statistics";
import { Route, Routes } from "react-router-dom";

export const MainContent = () => {
    return (
        <Box flex="1.5" p={{ md: "4" }}>
            <Routes>
                <Route path="/map" element={<MainMap />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </Box>
    );
};
