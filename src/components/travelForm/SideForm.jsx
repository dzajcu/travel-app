import React from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    Flex,
    Heading,
    Text,
    HStack,
    CloseButton,
} from "@chakra-ui/react";
import { DropZone } from "./components/FileDropZone";
import { DateRangePicker } from "./components/DatePicker";

export const SideForm = ({ isSideFormOpen, onSideFormClose }) => {
    return (
        <>
            <Flex
                padding={{ base: "20px", md: "40px" }}
                direction={"column"}
                right={isSideFormOpen ? 0 : -600}
                position="fixed"
                top={"0%"}
                height="100%"
                width={{ base: "80%", md: "600px" }}
                backgroundColor="#ffffff"
                transition="all 0.5s cubic-bezier(0,1,.88,.99)"
                zIndex={9999}
                gap={6}
                backdropFilter={"blur(5px)"}
            >
                <HStack align={"center"} justify={"space-between"}>
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
                    <CloseButton onClick={onSideFormClose} />
                </HStack>
                <FormControl>
                    <Input
                        isRequired={true}
                        id="place"
                        fontSize="sm"
                        ms={{ base: "0px", md: "0px" }}
                        type="text"
                        placeholder="Wprowadź miejsce"
                        mb="24px"
                        // fontWeight="500"
                        size="lg"
                    />
                </FormControl>
                <DateRangePicker />
                <DropZone />
                <Button
                    onClick={onSideFormClose}
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
                onClick={onSideFormClose}
                opacity={isSideFormOpen ? 1 : 0}
                transition={"0.3s ease-in-out"}
                position="fixed"
                top={{ base: 20, md: 0 }}
                left="0"
                width="100%"
                height="100%"
                background="rgba(0, 0, 0, 0.3)"
                zIndex={isSideFormOpen ? 9998 : -1}
                backdropFilter="blur(5px)"
            />
        </>
    );
};
