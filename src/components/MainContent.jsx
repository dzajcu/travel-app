import { Box } from "@chakra-ui/react";
import React from "react";
import Statistics from "./Statistics";
import { Route, Routes, useLocation } from "react-router-dom";

export const MainContent = () => {
    return (
        <Box w="max-content" ml={"60px"}>
            <Routes>
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </Box>
    );
};
