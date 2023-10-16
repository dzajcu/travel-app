import React, { useState } from "react";
import MainMap from "./MainMap";
import { NavItem } from "./NavItem";
import {
    IconButton,
    Image,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Divider,
    Card,
} from "@chakra-ui/react";
import {
    FiHome,
    FiMap,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiChevronUp,
    FiUsers,
    FiSearch,
    FiCalendar,
} from "react-icons/fi";
import { divIcon } from "leaflet";
import { MdOutlineTravelExplore } from "react-icons/md";
const LinkItems = [
    { name: "Mapa", icon: FiMap },
    { name: "Przeglądaj", icon: MdOutlineTravelExplore },
    { name: "Planer", icon: FiCalendar },
    { name: "Statystyki", icon: FiTrendingUp },
    { name: "Ulubione", icon: FiStar },
    { name: "Grupy", icon: FiUsers },
    { name: "Ustawienia", icon: FiSettings },
];

const SidebarContent = ({
    onClose,
    activeNavItem,
    setActiveNavItem,
    ...rest
}) => {
    const handleNavItemClick = (index) => {
        setActiveNavItem(index);
    };

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("gray.50", "gray.900")}
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "50%", md: 200 }}
            pos="fixed"
            h="full"
            zIndex={10}
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
                    onClick={onClose}
                />
            </Flex>
            {/* <Divider my={3} /> */}
            <Box mt={10}>
                {LinkItems.map((link, index) => (
                    <NavItem
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
                                <MenuItem>Profil</MenuItem>
                                <MenuDivider />
                                <MenuItem color={"#F53B3B"}>
                                    Wyloguj się
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Box>
        </Box>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            w={"100%"}
            pos={{ md: "absolute" }}
            px={{ base: 4, md: 4 }}
            height={{ base: 20, md: 110 }}
            alignItems="center"
            bg={
                {
                    // base: useColorModeValue("white", "gray.900"),
                    // md: useColorModeValue("white", "gray.900"),
                }
            }
            boxShadow="md"
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Image
                src="../../public/Logo.png"
                w={"30%"}
                display={{ md: "none" }}
            />
            <HStack spacing={{ base: "0", md: "6" }} display={{ md: "none" }}>
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
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">zajcu</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronUp />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            zIndex={9999}
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
                        >
                            <MenuItem>Profil</MenuItem>
                            <MenuDivider />
                            <MenuItem color={"#F53B3B"}>Wyloguj się</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

const SidebarWithHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeNavItem, setActiveNavItem] = useState(0);

    return (
        <Box
            minH="100vh"
            bg={useColorModeValue("gray.100", "gray.900")}
            boxShadow="lg"
        >
            <SidebarContent
                onClose={onClose}
                activeNavItem={activeNavItem}
                setActiveNavItem={setActiveNavItem}
                display={{ base: "none", md: "block" }}
                boxShadow="lg"
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent
                        onClose={onClose}
                        activeNavItem={activeNavItem}
                        setActiveNavItem={setActiveNavItem}
                    />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />

            <Box display="flex" ml={{ base: 0, md: 200 }}>
                <Box
                    w="100%"
                    flex="1"
                    p="6"
                    zIndex={10}
                    display={{ base: "none", md: "block" }}
                >
                    <Box
                        display="flex"
                        alignItems={"baseline"}
                        color="gray.500"
                    >
                        {" "}
                        <Text fontSize="xs" mr="5px">
                            Pages /
                        </Text>
                        <Text fontSize="sm">
                            {LinkItems[activeNavItem].name}
                        </Text>
                    </Box>
                    <Text mt="5px" fontSize="3xl">
                        {LinkItems[activeNavItem].name}
                    </Text>
                </Box>
                <Box
                    display={activeNavItem === 0 ? "block" : "none"}
                    flex="1.5"
                    p="4"
                >
                    <MainMap />
                </Box>
            </Box>
        </Box>
    );
};

export default SidebarWithHeader;
