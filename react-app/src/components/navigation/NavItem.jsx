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
        <NavLink to={path}>
            <Flex
                pos={"relative"} // relative dla pseudoelementu after
                onClick={onClick}
                align="center"
                p="2"
                pl="6"
                w="100%"
                role="group"
                cursor="pointer"
                transition="0.2s"
                _hover={{
                    bg: "gray.100",
                }}
                color={isActive ? "black" : "gray.500"}
                fontWeight={"400"}
                fontSize={"md"}
                {...rest}
                _after={{
                    content: '""',
                    w: isActive ? "3px" : "0px",
                    h: "100%",
                    bg: "#808000",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    transition: "0.2s ease-in-out"
                }}

            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="20"
                        as={icon}
                        color={isActive ? "#808000" : ""}
                    />
                )}
                {children}
            </Flex>
        </NavLink>
    );
};
