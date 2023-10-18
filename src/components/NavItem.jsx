import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
export const NavItem = ({
    icon,
    children,
    path,
    isActive,
    onClick,
    ...rest
}) => {
    return (
        <NavLink
            to={path}
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
                    bg: "#808000",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    transition: "0.2s ease-in-out", // Dodaj animację do właściwości height
                }}

                /* Dodaj również styl, który wydłuża element od środka */
            >
                    {" "}
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            as={icon}
                            color={isActive ? "#808000" : ""}
                        />
                    )}
                    {children}
            </Flex>
        </NavLink>
    );
};
