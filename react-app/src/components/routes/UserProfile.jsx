"use client";

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
    Box,
    Stack,
    Center,
    Avatar,
    AvatarBadge,
    IconButton,
    Flex,
    Switch,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import handleUpdateUser from "./handleUpdateUser.jsx";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff, IoMdClose } from "react-icons/io";

export default function UserProfile({ setSidebarUsername }) {
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
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await handleUpdateUser(
            email,
            username,
            password,
            newPassword,
            newPasswordConfirm,
            setIsLoading,
            toast,
            setSidebarUsername
        );
    };

    const getCurrentUser = async () => {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const userData = await response.json();
            setEmail(userData.data.user.email);
            setUsername(userData.data.user.username);
        }
    };
    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <Box width="400px" mt="12px" mx="10px">
            <Flex align="center" gap="30px">
                <Stack>
                    <Center justifyContent="flex-start" mb="10px">
                        <Avatar size="xl" src="o" bg="olive">
                            <AvatarBadge
                                as={IconButton}
                                size="sm"
                                rounded="full"
                                top="-10px"
                                colorScheme="red"
                                aria-label="remove Image"
                                icon={<IoMdClose />}
                            />
                        </Avatar>
                    </Center>
                </Stack>
                <Button
                    width="150px"
                    fontSize="sm"
                    fontWeight="500"
                    h="40px"
                    mb="16px"
                    borderRadius="2xl"
                    bgColor={"gray.300"}
                    color="gray.700"
                    _hover={{ bg: "gray.400", color: "white" }}
                    type="submit"
                >
                    Change Icon
                </Button>
            </Flex>
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
                    value={email}
                    isRequired={true}
                    id="email"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="email"
                    mb="12px"
                    fontWeight="500"
                    placeholder="travel@map.com"
                    size="md"
                    borderRadius="2xl"
                    borderColor={error ? "red.500" : "gray.200"}
                    backgroundColor="white"
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
                    value={username}
                    id="username"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="traveller123"
                    mb="12px"
                    fontWeight="500"
                    size="md"
                    borderRadius="2xl"
                    backgroundColor="white"
                />
                <Flex justify="flex-end">
                    <Button
                        mt="10px"
                        fontSize="sm"
                        fontWeight="500"
                        w="35%"
                        h="40px"
                        borderRadius="2xl"
                        bgColor={textColorBrand}
                        color="white"
                        _hover={{ bg: "green.600" }}
                        type="submit"
                        isLoading={isLoading}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                </Flex>
                <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={"textColorDetails"}
                    display="flex"
                    placement="right"
                >
                    Current Password<Text color={brandStars}>*</Text>
                </FormLabel>

                <InputGroup size="md" mb="12px">
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        value={password}
                        isRequired={true}
                        fontSize="sm"
                        placeholder="*************"
                        size="md"
                        type={show ? "text" : "password"}
                        autoComplete="new-password"
                        borderRadius="2xl"
                        backgroundColor="white"
                    />
                    <InputRightElement
                        display="flex"
                        alignItems="center"
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
                    New Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md" mb="12px">
                    <Input
                        onChange={(e) => setNewPassword(e.target.value)}
                        id="password-validated"
                        isRequired={true}
                        fontSize="sm"
                        placeholder="*************"
                        size="md"
                        type={showPasswordConfirm ? "text" : "password"}
                        autoComplete="off"
                        borderRadius="2xl"
                        backgroundColor="white"
                    />
                    <InputRightElement
                        display="flex"
                        alignItems="center"
                        _hover={{ cursor: "pointer" }}
                        onClick={handleClickPasswordConfirm}
                        color={textColorSecondary}
                    >
                        <Icon
                            color={textColorSecondary}
                            as={
                                showPasswordConfirm
                                    ? IoMdEyeOff
                                    : MdOutlineRemoveRedEye
                            }
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
                    Confirm New Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                    <Input
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        id="password-validated"
                        isRequired={true}
                        fontSize="sm"
                        placeholder="*************"
                        mb="12px"
                        size="md"
                        type={showPasswordConfirm ? "text" : "password"}
                        autoComplete="off"
                        borderRadius="2xl"
                        backgroundColor="white"
                    />
                    <InputRightElement
                        display="flex"
                        alignItems="center"
                        _hover={{ cursor: "pointer" }}
                        onClick={handleClickPasswordConfirm}
                        color={textColorSecondary}
                    >
                        <Icon
                            color={textColorSecondary}
                            as={
                                showPasswordConfirm
                                    ? IoMdEyeOff
                                    : MdOutlineRemoveRedEye
                            }
                        />
                    </InputRightElement>
                </InputGroup>

                {/* <Stack direction="row" mt="10px">
                    <FormLabel
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColorDetails}
                        display="flex"
                    >
                        Do u want to make your map public?
                        <Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Switch size="md" colorScheme="teal" />
                </Stack> */}
                <Flex justify="flex-end">
                    <Button
                        mt="10px"
                        fontSize="sm"
                        fontWeight="500"
                        w="35%"
                        h="40px"
                        borderRadius="2xl"
                        bgColor={textColorBrand}
                        color="white"
                        _hover={{ bg: "green.600" }}
                        type="submit"
                        isLoading={isLoading}
                        onClick={handleSubmit}
                    >
                        Update Password
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    );
}
