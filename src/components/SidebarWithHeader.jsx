import React, { useState } from "react";
import { SideMenu } from "./SideMenu";
import { MapTiler } from "./MapTiler";
import { SidebarContent } from "./SidebarContent";
import { MobileNav } from "./MobileNav";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";

const SidebarWithHeader = () => {
    const {
        isOpen: isMobileOpen,
        onOpen: onMobileOpen,
        onClose: onMobileClose,
    } = useDisclosure();

    const {
        isOpen: isSideMenuOpen,
        onOpen: onSideMenuOpen,
        onClose: onSideMenuClose,
    } = useDisclosure();

    const {
        isOpen: isSideFormOpen,
        onOpen: onSideFormOpen,
        onClose: onSideFormClose,
    } = useDisclosure();

    const [activeNavItem, setActiveNavItem] = useState(0);

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onMobileClose={onMobileClose}
                activeNavItem={activeNavItem}
                setActiveNavItem={setActiveNavItem}
                onSideMenuOpen={onSideMenuOpen}
                onSideMenuClose={onSideMenuClose}
                isSideFormOpen={isSideFormOpen}
                onSideFormClose={onSideFormClose}
                display={{ base: "none", md: "block" }}
                boxShadow="lg"
                backgroundColor="rgba(255, 255, 255, 0.7)"
                backdropFilter="blur(20px)"
            />
            <Drawer
                isOpen={isMobileOpen}
                placement="left"
                onMobileClose={onMobileClose}
                returnFocusOnClose={false}
                onOverlayClick={onMobileClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent
                        width="100%"
                        onMobileClose={onMobileClose}
                        activeNavItem={activeNavItem}
                        setActiveNavItem={setActiveNavItem}
                        onSideMenuClose={onSideMenuClose}
                    />
                </DrawerContent>
            </Drawer>
            <MobileNav onMobileOpen={onMobileOpen} />
            <MapTiler
                onSideFormClose={onSideFormClose}
                isSideFormOpen={isSideFormOpen}
                onSideFormOpen={onSideFormOpen}
            />
            <SideMenu
                isSideMenuOpen={isSideMenuOpen}
                onSideMenuOpen={onSideMenuOpen}
                onSideMenuClose={onSideMenuClose}
                setActiveNavItem={setActiveNavItem}
            />
        </Box>
    );
};

export default SidebarWithHeader;
