import React, { useState } from "react";
import { NavLink, Form, useNavigate } from "react-router-dom";
import handlePasswordReset from "./handlePasswordReset";

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    Divider,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import AuthLayout from "./AuthLayout";
import illustration from "../../assets/auth-bg.jpg";

function ForgotPassword() {
    // Chakra color mode
    const textColor = useColorModeValue("#808000", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("gray.700", "gray.600");
    const textColorBrand = useColorModeValue("#808000", "white");
    const brandStars = useColorModeValue("#808000", "green.400");
    const googleActive = useColorModeValue(
        { bg: "gray.300" },
        { bg: "whiteAlpha.200" }
    );
    const [show, setShow] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClickPasswordConfirm = () =>
        setShowPasswordConfirm(!showPasswordConfirm);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const toast = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await handlePasswordReset(email, setIsLoading, navigate, toast);
    };

    return (
        <AuthLayout illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                flexDirection="column"
                alignItems="start"
                w="100%"
                mx={{ base: "auto", lg: "0px" }}
                me="auto"
                px={{ base: "25px", md: "0px" }}
            >
                <Box>
                    <Heading
                        color={textColorBrand}
                        fontSize="36px"
                        mb="10px"
                        mt="10vh"
                    >
                        Reset Password
                    </Heading>
                    <Text
                        ms="4px"
                        color={textColorSecondary}
                        fontWeight="400"
                        fontSize="md"
                    >
                        Enter your email address and we will send you <br />a link to
                        reset your password.
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
                    <Box position="relative" padding="6">
                        <Divider />
                    </Box>
                    {/* <Flex align="center" mb="25px"></Flex> */}
                    <Form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColorDetails}
                                mb="8px"
                            >
                                Email<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired={true}
                                id="email"
                                fontSize="sm"
                                ms={{ base: "0px", md: "0px" }}
                                type="email"
                                placeholder="travel@map.com"
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                borderRadius="2xl"
                                borderColor={error ? "red.500" : "gray.300"}
                            />

                            <Button
                                fontSize="sm"
                                fontWeight="500"
                                w="100%"
                                h="50"
                                mb="16px"
                                borderRadius="2xl"
                                bgColor={textColorBrand}
                                color="white"
                                _hover={{ bg: "green.600" }}
                                type="submit"
                                isLoading={isLoading}
                            >
                                Send Reset Link
                            </Button>
                        </FormControl>
                    </Form>
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
        </AuthLayout>
    );
}

export default ForgotPassword;
