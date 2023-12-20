import React, { useEffect, useState } from "react";
import { SideMenu } from "./SideMenu";
import { MapTiler } from "../map/MapTiler";
import { SidebarContent } from "./SidebarContent";
import { MobileNav } from "./MobileNav";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import getUser from "./getUser";
export default function SidebarOverlayWithMap() {
    const toast = useToast();
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
    const [username, setSidebarUsername] = useState("");
    const [tours, setTours] = useState([]);
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        await getUser(setSidebarUsername, setTours, navigate, toast);
    };
    useEffect(() => {
        getCurrentUser(); // Wywołaj funkcję getCurrentUser za każdym razem, gdy komponent jest renderowany
    }, []); // Dodaj username do zależności useEffect
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                username={username}
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
                        onSideMenuOpen={onSideMenuOpen}
                    />
                </DrawerContent>
            </Drawer>
            <MobileNav onMobileOpen={onMobileOpen} />
            <MapTiler
                onSideFormClose={onSideFormClose}
                isSideFormOpen={isSideFormOpen}
                onSideFormOpen={onSideFormOpen}
                username={username}
                tours={tours}
            />
            <SideMenu
                isSideMenuOpen={isSideMenuOpen}
                onSideMenuOpen={onSideMenuOpen}
                onSideMenuClose={onSideMenuClose}
                setActiveNavItem={setActiveNavItem}
                setSidebarUsername={setSidebarUsername}
            />
        </Box>
    );
}
