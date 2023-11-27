import { Box } from "@chakra-ui/react";
import React from "react";
import Explore from "./Explore";
import { Route, Routes, useLocation } from "react-router-dom";

export const MainContent = () => {
    return (
        <Box
            ml={"60px"}
            h="100%"
            w="90%"
            
            // p={"10"}
            flexWrap="wrap"
            overflowY="auto"
            css={{
                "&::-webkit-scrollbar": {
                    width: "0.4em",
                },
            }}
        >
            <Routes>
                <Route path="/explore" element={<Explore />} />
            </Routes>
        </Box>
    );
};
