import React, { useEffect } from "react";
import { NavItem } from "./NavItem";
import { NavLink } from "react-router-dom";
import LinkItems from "../routes/LinkItems";
import {
    Image,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FiChevronUp } from "react-icons/fi";

export const SidebarContent = ({
    onMobileClose,
    activeNavItem,
    setActiveNavItem,
    onSideMenuOpen,
    onSideMenuClose,
    isSideFormOpen,
    onSideFormClose,
    ...rest
}) => {
    const handleNavItemClick = (index) => {
        isSideFormOpen && onSideFormClose();
        setActiveNavItem(index);
    };

    useEffect(() => {
        activeNavItem === 0 ? onSideMenuClose() : onSideMenuOpen();
    }, [activeNavItem, onSideMenuOpen]);

    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "50%", md: 180 }}
            pos="fixed"
            h={{ base: "full", md: "96%" }}
            m={{ base: 0, md: 4 }}
            zIndex={10}
            borderRadius={"2xl"}
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                // mx="8"
                justifyContent="space-between"
            >
                <Image src="../../public/Logo.png" />

                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onMobileClose}
                />
            </Flex>
            <Box mt={10}>
                {LinkItems.map((link, index) => (
                    <NavItem
                        path={link.path}
                        key={link.name}
                        icon={link.icon}
                        isActive={activeNavItem === index}
                        onClick={() => handleNavItemClick(index)}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </Box>

            <Box position="absolute" bottom="8" left="20%" right="0">
                <HStack spacing={{ base: "0", md: "6" }}>
                    <Flex alignItems={"center"}>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
                            >
                                <HStack>
                                    <Avatar
                                        size={"sm"}
                                        src={
                                            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                        }
                                        borderColor={"gray.200"}
                                        borderWidth={1}
                                    />
                                    <VStack
                                        display={{ base: "none", md: "flex" }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="md">zajcu</Text>
                                    </VStack>
                                    <Box display={{ base: "none", md: "flex" }}>
                                        <FiChevronUp />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                zIndex={9999}
                                bg={useColorModeValue("white", "gray.200")}
                                borderColor={useColorModeValue(
                                    "gray.200",
                                    "gray.700"
                                )}
                            >
                                <MenuItem>Profile</MenuItem>
                                <MenuDivider />
                                <NavLink to="/auth/sign-in">
                                    <MenuItem color={"#F53B3B"}>Log out</MenuItem>
                                </NavLink>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Box>
        </Box>
    );
};
