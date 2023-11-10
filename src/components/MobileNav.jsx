import React from "react";
import {
    IconButton,
    Image,
    Avatar,
    Box,
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
import { FiMenu, FiChevronUp } from "react-icons/fi";

export const MobileNav = ({ onMobileOpen, ...rest }) => {
    return (
        <Flex
            w={"100%"}
            pos={{ md: "absolute" }}
            px={{ base: 4, md: 4 }}
            height={{ base: 20, md: 110 }}
            alignItems="center"
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onMobileOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Image src="../../public/Logo.png" w={"30%"} display={{ md: "none" }} />
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
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <MenuItem>Profil</MenuItem>
                            <MenuDivider ml="10%" w={"80%"} />
                            <MenuItem color={"#F53B3B"}>Wyloguj się</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
