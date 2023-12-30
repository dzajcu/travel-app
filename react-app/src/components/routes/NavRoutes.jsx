import { Box } from "@chakra-ui/react";
import React from "react";
import Explore from "./Explore";
import ExploreDetails from "./ExploreDetails";
import UserProfile from "./UserProfile";
import { Route, Routes } from "react-router-dom";

export const NavRoutes = ({ setSidebarUsername }) => {
    
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
                    width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                    width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#808000",
                    borderRadius: "24px",
                },
            }}
        >
            <Routes>
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:id" element={<ExploreDetails />} />
                <Route
                    path="/profile"
                    element={<UserProfile setSidebarUsername={setSidebarUsername} />}
                />
            </Routes>
        </Box>
    );
};
