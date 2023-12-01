import React from "react";
import { NavLink } from "react-router-dom";
import SignInForm from "./SignInForm";
import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    Divider,
    AbsoluteCenter,
    useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "./AuthLayout";
import illustration from "../../assets/auth-bg.jpg";
import { FcGoogle } from "react-icons/fc";

function SignInScreen() {
    // Chakra color mode
    const textColor = useColorModeValue("#808000", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("gray.700", "gray.600");
    const textColorBrand = useColorModeValue("#808000", "white");
    const brandStars = useColorModeValue("#808000", "green.400");
    const googleBg = useColorModeValue("gray.100", "white");
    const googleText = useColorModeValue("green.700", "white");
    const googleHover = useColorModeValue(
        { bg: "gray.200" },
        { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
        { bg: "gray.300" },
        { bg: "whiteAlpha.200" }
    );

    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                flexDirection="column"
                alignItems="start"
                w="100%"
                mx={{ base: "auto", lg: "0px" }}
                me="auto"
                px={{ base: "25px", md: "0px" }}
                // h="100%"
                // justifyContent="center"
                // mb={{ base: "30px", md: "60px" }}
                // mt={{ base: "40px", md: "14vh" }}
            >
                <Box>
                    <Heading color={textColor} fontSize="36px" mb="10px">
                        Sign In
                    </Heading>
                    <Text
                        mb="36px"
                        ms="4px"
                        color={textColorSecondary}
                        fontWeight="400"
                        fontSize="md"
                    >
                        Enter your email and password to Sign in!
                    </Text>
                </Box>
                <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: "100%", md: "420px" }}
                    maxW="100%"
                    background="transparent"
                    borderRadius="2xl"
                    mx={{ base: "auto", lg: "unset" }}
                    me="auto"
                    mb={{ base: "20px", md: "auto" }}
                >
                    <Button
                        fontSize="sm"
                        me="0px"
                        mb="12px"
                        py="15px"
                        h="50px"
                        borderRadius="2xl"
                        bg={googleBg}
                        color={googleText}
                        fontWeight="500"
                        _hover={googleHover}
                        _active={googleActive}
                        _focus={googleActive}
                    >
                        <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                        Sign in with Google
                    </Button>
                    <Box position="relative" padding="6">
                        <Divider />
                        <AbsoluteCenter
                            mb="36px"
                            ms="4px"
                            color={textColorSecondary}
                            fontWeight="400"
                            fontSize="sm"
                            bg="white"
                            px="4"
                        >
                            or
                        </AbsoluteCenter>
                    </Box>
                    <SignInForm />
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="start"
                        maxW="100%"
                        mb={"30px"}
                    >
                        <Text
                            color={textColorDetails}
                            fontWeight="400"
                            fontSize="14px"
                        >
                            Don't have an account?
                            <NavLink to="/auth/sign-up">
                                <Text
                                    color={textColorBrand}
                                    as="span"
                                    ms="5px"
                                    fontWeight="500"
                                >
                                    Sign up now!
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignInScreen;
