import { Box } from "@chakra-ui/react";
import React from "react";
import Explore from "./Explore";
import ExploreDetails from "./ExploreDetails";
import UserProfile from "./UserProfile";
import { Route, Routes } from "react-router-dom";

export const NavRoutes = () => {
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
                <Route path="/explore/:id" element={<ExploreDetails />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </Box>
    );
};
