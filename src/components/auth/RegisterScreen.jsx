import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    Divider,
    AbsoluteCenter,
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "./AuthLayout";
// Assets
import illustration from "../../../public/auth-bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";

function RegisterScreen() {
    // Chakra color mode
    const textColor = useColorModeValue("#808000", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("gray.700", "gray.600");
    const textColorBrand = useColorModeValue("#808000", "white");
    const brandStars = useColorModeValue("#808000_", "green.400");
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
    const [show, setShow] = React.useState(false);
    const [showValidated, setShowValidated] = React.useState(false);
    const handleClick = () => setShow(!show);
    const handleClickValidated = () => setShowValidated(!showValidated);
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
                // h="100%"
                // justifyContent="center"
                // mb={{ base: "30px", md: "60px" }}
                // mt={{ base: "40px", md: "14vh" }}
            >
                <Box>
                    <Heading color={textColor} fontSize="36px" mb="10px">
                        Sign Up
                    </Heading>
                    <Text
                        mb="36px"
                        ms="4px"
                        color={textColorSecondary}
                        fontWeight="400"
                        fontSize="md"
                    >
                        Start your Journey - enter your credentials to Sign up!
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
                        mb="26px"
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
                        Sign up with Google
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
                    {/* <Flex align="center" mb="25px"></Flex> */}
                    <FormControl>
                        <FormLabel
                            display="flex"
                            ms="4px"
                            fontSize="sm"
                            fontWeight="500"
                            color={textColor}
                            mb="8px"
                        >
                            Email<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
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
                        />
                        <FormLabel
                            display="flex"
                            ms="4px"
                            fontSize="sm"
                            fontWeight="500"
                            color={textColor}
                            mb="8px"
                        >
                            Username<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            id="username"
                            fontSize="sm"
                            ms={{ base: "0px", md: "0px" }}
                            type="email"
                            placeholder="traveller123"
                            mb="24px"
                            fontWeight="500"
                            size="lg"
                            borderRadius="2xl"
                        />

                        <FormLabel
                            ms="4px"
                            fontSize="sm"
                            fontWeight="500"
                            color={textColor}
                            display="flex"
                        >
                            Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size="md" mb="24px">
                            <Input
                                id="password"
                                isRequired={true}
                                fontSize="sm"
                                placeholder="*************"
                                size="lg"
                                type={show ? "text" : "password"}
                                autoComplete="off"
                                borderRadius="2xl"
                            />
                            <InputRightElement
                                display="flex"
                                alignItems="center"
                                mt="4px"
                                onClick={handleClick}
                                _hover={{ cursor: "pointer" }}
                            >
                                <Icon
                                    color={textColorSecondary}
                                    as={show ? IoMdEyeOff : MdOutlineRemoveRedEye}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <FormLabel
                            ms="4px"
                            fontSize="sm"
                            fontWeight="500"
                            color={textColor}
                            display="flex"
                        >
                            Confirm password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size="md" mb="24px">
                            <Input
                                id="password-validated"
                                isRequired={true}
                                fontSize="sm"
                                placeholder="*************"
                                mb="24px"
                                size="lg"
                                type={showValidated ? "text" : "password"}
                                autoComplete="off"
                                borderRadius="2xl"
                            />
                            <InputRightElement
                                display="flex"
                                alignItems="center"
                                mt="4px"
                                // padding={"10px"}
                                _hover={{ cursor: "pointer" }}
                                onClick={handleClickValidated}
                                color={textColorSecondary}
                            >
                                <Icon
                                    // padding={"6px"}
                                    color={textColorSecondary}
                                    as={
                                        showValidated
                                            ? IoMdEyeOff
                                            : MdOutlineRemoveRedEye
                                    }
                                />
                            </InputRightElement>
                        </InputGroup>

                        <NavLink to="/menu/map">
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
                            >
                                Sign up
                            </Button>
                        </NavLink>
                    </FormControl>
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
                            Already have an account?
                            <NavLink to="/auth/sign-in">
                                <Text
                                    color={textColorBrand}
                                    as="span"
                                    ms="5px"
                                    fontWeight="500"
                                >
                                    Sign in
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </AuthLayout>
    );
}

export default RegisterScreen;
