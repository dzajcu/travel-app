import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import { DropZone } from "./FileDropZone";
import { DateRangePicker } from "./DatePicker";

export const SideForm = ({ isFormOpen, setIsFormOpen }) => {
    const [city, setCity] = useState("");
    console.log("xxx");

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <>
            <Flex
                padding={{ base: "20px", md: "40px" }}
                direction={"column"}
                just
                right={isFormOpen ? 0 : -600}
                position="fixed"
                top={"0%"}
                height="100%"
                width={{ base: "80%", md: "600px" }}
                background="white"
                transition="all 0.4s ease-in-out"
                zIndex={9999}
                gap={6}
            >
                <Heading
                    color="black"
                    fontSize="32px"
                    mb="10px"
                    display={"flex"}
                >
                    Dodaj podróż
                    <Text color={"#808000"} ml={1}>
                        !
                    </Text>
                </Heading>
                <FormControl>
                    <Input
                        isRequired={true}
                        id="place"
                        fontSize="sm"
                        ms={{ base: "0px", md: "0px" }}
                        type="text"
                        placeholder="Wprowadź miejsce"
                        mb="24px"
                        fontWeight="500"
                        size="lg"
                    />
                </FormControl>
                <DateRangePicker />
                <DropZone />
                <Button
                    onClick={handleSubmit}
                    fontSize="sm"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="16px"
                    borderRadius="16px"
                    bgColor="#808000"
                    color="white"
                    _hover={{ bg: "green.600" }}
                >
                    Dodaj do mapy
                </Button>
            </Flex>

            <Box
                onClick={() => setIsFormOpen(!isFormOpen)}
                opacity={isFormOpen ? 1 : 0}
                transition={"0.3s ease-in-out"}
                position="fixed"
                top="0"
                left="0"
                width="100%"
                height="100%"
                background="rgba(0, 0, 0, 0.5)" // Tło z półprzezroczystym cieniem
                zIndex={isFormOpen ? 9998 : -1}
            ></Box>
        </>
    );
};
