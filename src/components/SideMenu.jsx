import { Box } from "@chakra-ui/react";
import React from "react";
import { MainContent } from "./MainContent";
import { useColorModeValue, CloseButton } from "@chakra-ui/react";

export const SideMenu = ({ isSideMenuOpen, onSideMenuClose, setActiveNavItem }) => {
    const handleSideMenuClose = () => {
        onSideMenuClose();
        setActiveNavItem(0);
    };

    return (
        <>
            <Box
                pos="fixed"
                display={isSideMenuOpen ? { base: "none", md: "block" } : { base: "none", md: "none" }}
                m={{ base: 0, md: 4 }}
                ml={{ base: 0, md: 175 }}
                w={isSideMenuOpen ? { base: "50%", md: "80%" } : "0px"}
                h={{ base: "full", md: "96%" }}
                transition="left 2s ease"
                bg={useColorModeValue("gray.50", "gray.900")}
                borderRightColor={useColorModeValue("gray.200", "gray.700")}
                backgroundColor="rgba(255, 255, 255, 0.8)"
                backdropFilter="blur(20px)"
                zIndex={9}
                borderRadius={12}
                boxShadow={"lg"}
            >
                <MainContent />
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
                transition={"0.2s ease-in-out"}
                position="fixed"
                top={{ base: 20, md: 0 }}
                left="0"
                width="100%"
                height="100%"
                background="rgba(0, 0, 0, 0.2)"
                zIndex={isSideMenuOpen ? 8 : -1}
                backdropFilter="blur(5px)"
            />
        </>
    );
};
