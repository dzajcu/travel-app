import { Box } from "@chakra-ui/react";
import React from "react";
import { NavRoutes } from "../routes/NavRoutes";
import { useColorModeValue, CloseButton } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

export const SideMenu = ({ isSideMenuOpen, onSideMenuClose, setActiveNavItem }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isProfile = "/menu/profile" === location.pathname;
    const handleSideMenuClose = () => {
        setActiveNavItem(0);
        onSideMenuClose();
        navigate("/menu/map");
    };

    return (
        <>
            <Box
                pos="fixed"
                // display={isSideMenuOpen ? { base: "none", md: "block" } : { base: "none", md: "none" }}
                display={{ base: "none", md: "block" }}
                m={{ base: 0, md: 4 }}
                ml={{ base: 0, md: 157 }}
                // p={{ base: 0, md: 4 }}
                pt={{ base: 0, md: 10 }}
                pb={{ base: 0, md: 10 }}
                w={isSideMenuOpen ? (isProfile ? "500px" : "60%") : "0%"}
                h={{ base: "full", md: "96%" }}
                transition="0.5s cubic-bezier(0,1,.88,.99)"
                bg={useColorModeValue("gray.50", "gray.900")}
                backgroundColor="rgba(255, 255, 255, 0.6)"
                backdropFilter="blur(10px)"
                zIndex={9}
                borderRadius={"2xl"}
                boxShadow={"lg"}
                css={{
                    "&::-webkit-scrollbar": {
                        width: "0.4em",
                    },
                }}
            >
                <NavRoutes />
                <CloseButton
                    onClick={handleSideMenuClose}
                    pos={"absolute"}
                    top={3}
                    right={3}
                />
            </Box>
            <Box
                onClick={handleSideMenuClose}
                opacity={isSideMenuOpen ? 1 : 0}
                transition={"0.3s ease-in-out"}
                position="fixed"
                top={{ base: 20, md: 0 }}
                left="0"
                width="100%"
                height="100%"
                background="rgba(0, 0, 0, 0.2)"
                zIndex={isSideMenuOpen ? 8 : -1}
                backdropFilter="blur(1px)"
            />
        </>
    );
};
