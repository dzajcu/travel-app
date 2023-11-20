import React, { useState } from "react";
import { NavLink, useNavigate, Form } from "react-router-dom";
import handleSignIn from "./handleSignIn";
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";

function SignInForm() {
    const textColor = useColorModeValue("#808000", "white");

    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("#808000", "white");
    const brandStars = useColorModeValue("#808000", "green.400");

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log();
        await handleSignIn(usernameOrEmail, password, setIsLoading, navigate, toast);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                >
                    Email or username<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    id="email"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="travel@map.com"
                    mb="24px"
                    fontWeight="500"
                    size="lg"
                    borderRadius="2xl"
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                <InputGroup size="md">
                    <Input
                        id="password"
                        isRequired={true}
                        fontSize="sm"
                        placeholder="*************"
                        mb="24px"
                        size="lg"
                        type={show ? "text" : "password"}
                        autoComplete="off"
                        borderRadius="2xl"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                        _hover={{ cursor: "pointer" }}
                        onClick={handleClick}
                    >
                        <Icon
                            color={textColorSecondary}
                            as={show ? IoMdEyeOff : MdOutlineRemoveRedEye}
                        />
                    </InputRightElement>
                </InputGroup>
                <Flex justifyContent="flex-end" align="center" mb="24px">
                    <FormControl display="flex" alignItems="center">
                        <Checkbox
                            id="remember-login"
                            colorScheme="yellow"
                            me="10px"
                        />
                        <FormLabel
                            htmlFor="remember-login"
                            mb="0"
                            fontWeight="normal"
                            color={textColor}
                            fontSize="sm"
                        >
                            Remember me
                        </FormLabel>
                    </FormControl>
                    <NavLink to="/auth/forgot-password">
                        <Text
                            color={textColorBrand}
                            fontSize="sm"
                            w="124px"
                            fontWeight="500"
                        >
                            Forgot password?
                        </Text>
                    </NavLink>
                </Flex>
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
                    isLoading={isLoading}
                    type="submit"
                >
                    Sign in
                </Button>
            </FormControl>
        </Form>
    );
}

export default SignInForm;
