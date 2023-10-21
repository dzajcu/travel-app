// Chakra imports
import { Box, Flex, Icon, Text, transform } from "@chakra-ui/react";
import React from "react";

// Custom components
import { NavLink } from "react-router-dom";
// Assets
import { FaChevronLeft } from "react-icons/fa";

function AuthIllustration(props) {
    const { children, illustrationBackground } = props;
    // Chakra color mode
    return (
        <Flex position="relative" h="100vh" background="white" overflow="auto">
            <Flex
                h={{
                    base: "100vh",
                    sm: "initial",
                    md: "unset",
                    lg: "100vh",
                    xl: "100vh",
                }}
                w="100%"
                maxW={{ md: "66%", lg: "1313px" }}
                mx="auto"
                pt={{ sm: "30px", md: "0px" }}
                px={{ lg: "30px", xl: "0px" }}
                ps={{ xl: "70px" }}
                justifyContent="start"
                direction="column"
            >
                <NavLink
                    to="/menu/map"
                    style={() => ({
                        width: "fit-content",
                        marginTop: "40px",
                    })}
                >
                    <Flex
                        align="center"
                        ps={{ base: "25px", lg: "0px" }}
                        pt={{ lg: "0px", xl: "0px" }}
                        w="fit-content"
                        mb={{ base: "12px", md: "30px" }}
                        _hover={{
                            ".icon": {
                                transform: "translateX(-12px)",
                            },
                        }}
                    >
                        <Icon
                            as={FaChevronLeft}
                            me="12px"
                            h="13px"
                            w="8px"
                            color="gray.600"
                            className="icon"
                            transition="transform 0.3s ease-in-out"
                        />
                        <Text ms="0px" fontSize="sm" color="gray.600">
                            Powrót do strony głównej
                        </Text>
                    </Flex>
                </NavLink>
                {children}
                <Box
                    display={{ base: "none", md: "block" }}
                    h="100%"
                    minH="100vh"
                    w={{ lg: "50vw", "2xl": "44vw" }}
                    position="absolute"
                    right="0px"
                >
                    <Flex
                        bg={`url(${illustrationBackground})`}
                        justify="center"
                        align="end"
                        w="100%"
                        h="100%"
                        bgSize="cover"
                        bgPosition="50%"
                        position="absolute"
                        borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.55)",
                            borderBottomLeftRadius: {
                                lg: "120px",
                                xl: "200px",
                            },
                        }}
                    ></Flex>
                </Box>
                {/* <Footer /> */}
            </Flex>
            {/* <FixedPlugin /> */}
        </Flex>
    );
}

export default AuthIllustration;
