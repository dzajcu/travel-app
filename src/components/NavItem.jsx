import { Box, Flex, Icon } from "@chakra-ui/react";
import { gridLayer } from "leaflet";
import { useState } from "react";
export const NavItem = ({ icon, children, isActive, onClick, ...rest }) => {
    return (
        <Box
            as="a"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                pos={"relative"} // relative dla pseudoelementu after
                onClick={onClick}
                align="center"
                p="2"
                pl="6"
                w="100%"
                // mx="5"
                // borderRadius="lg"
                role="group"
                cursor="pointer"
                transition="0.2s"
                _hover={{
                    bg: "gray.100",
                }}
                color={isActive ? "black" : "gray.400"}
                fontWeight={"500"}
                {...rest}
                _after={{
                    content: '""',
                    w: isActive ? "3px" : "0px",
                    h: "100%",
                    bg: "green.400",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    color: "green.400",
                    transition: "0.2s ease-in-out", // Dodaj animację do właściwości height
                }}

                /* Dodaj również styl, który wydłuża element od środka */
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                        color={isActive ? "green" : ""}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
};
