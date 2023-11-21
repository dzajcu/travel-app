import { Box } from "@chakra-ui/react";
import React from "react";
import Explore from "./Explore";
import { Route, Routes, useLocation } from "react-router-dom";

export const MainContent = () => {
    return (
        <Box pl={"60px"} h="100%" w="100%" pt={"10"}>
            <Routes>
                <Route path="/explore" element={<Explore />} />
                
            </Routes>
        </Box>
    );
};
