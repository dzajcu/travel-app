import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import handleSignUp from "./handleSignUp";

import {
    Button,
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

function SignUpForm() {
    const textColor = useColorModeValue("#808000", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("gray.700", "gray.600");
    const textColorBrand = useColorModeValue("#808000", "white");
    const brandStars = useColorModeValue("#808000", "green.400");

    const [show, setShow] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClickPasswordConfirm = () =>
        setShowPasswordConfirm(!showPasswordConfirm);
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await handleSignUp(
            email,
            username,
            password,
            passwordConfirm,
            setIsLoading,
            navigate,
            toast
        );
    };

    return (
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
                    borderColor={error ? "red.500" : "gray.200"}
                />
                <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorDetails}
                    mb="8px"
                >
                    Username<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    onChange={(e) => setUsername(e.target.value)}
                    isRequired={true}
                    id="username"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
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
                    color={"textColorDetails"}
                    display="flex"
                    placement="right"
                >
                    Password<Text color={brandStars}>*</Text>
                </FormLabel>

                <InputGroup size="md" mb="24px">
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
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
                    color={textColorDetails}
                    display="flex"
                >
                    Confirm password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md" mb="24px">
                    <Input
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        id="password-validated"
                        isRequired={true}
                        fontSize="sm"
                        placeholder="*************"
                        mb="24px"
                        size="lg"
                        type={showPasswordConfirm ? "text" : "password"}
                        autoComplete="off"
                        borderRadius="2xl"
                    />
                    <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                        // padding={"10px"}
                        _hover={{ cursor: "pointer" }}
                        onClick={handleClickPasswordConfirm}
                        color={textColorSecondary}
                    >
                        <Icon
                            // padding={"6px"}
                            color={textColorSecondary}
                            as={
                                showPasswordConfirm
                                    ? IoMdEyeOff
                                    : MdOutlineRemoveRedEye
                            }
                        />
                    </InputRightElement>
                </InputGroup>

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
                    Sign up
                </Button>
            </FormControl>
        </Form>
    );
}

export default SignUpForm;