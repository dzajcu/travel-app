import React, { useState } from "react";
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
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { DropZone } from "./components/FileDropZone";
import { DateRangePicker } from "./components/DatePicker";
import { SearchBarControl } from "../map/SearchBarControl";
import handleSubmitForm from "./components/handleSubmitForm";

export const SideForm = ({ isSideFormOpen, onSideFormClose, username }) => {
    const toast = useToast();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedDate, setSelectedDate] = useState([null, null]);
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitForm(
            place,
            username,
            uploadedFiles,
            selectedDate,
            description,
            toast,
            onSideFormClose
        );
    };
    return (
        <>
            <Flex
                padding={{ base: "30px", md: 3 }}
                paddingLeft={{ md: 7 }}
                paddingRight={{ md: 7 }}
                direction={"column"}
                right={isSideFormOpen ? 0 : -600}
                position="fixed"
                // height="100  %"
                bottom={{ base: 0, md: "auto" }}
                top={{ md: 0 }}
                width={{ base: "80%", md: "600px" }}
                transition="all 0.5s cubic-bezier(0,1,.88,.99)"
                zIndex={9999}
                gap={5}
                borderBottomLeftRadius={{ base: "0", md: "3xl" }}
                borderTopLeftRadius={{ base: "3xl", md: "0" }}
                backgroundColor="rgba(255, 255, 255, 1)"
                // backdropFilter={"blur(5px)"}
            >
                {/* <Image
                    left={{ base: "20%", md: "37%" }}
                    top={{ base: -8, md: -1 }}
                    position={"absolute"}
                    width="300px"
                    objectFit="cover"
                    src="../../public/dotted-line-plane.png"
                    alt="Dotted line with paper plane flying along it"
                    transform={{ base: "rotate(8deg)", md: "rotate(0deg)" }}
                /> */}
                <HStack align={"center"} justify={"space-between"} mt="10px">
                    <Heading color="black" fontSize="32px" display={"flex"}>
                        Add Trip
                        <Text color={"#808000"} ml={1}>
                            !
                        </Text>
                    </Heading>
                    <CloseButton onClick={onSideFormClose} />
                </HStack>
                {/* <FormControl>
                    <Input
                        isRequired={true}
                        id="place"
                        fontSize="sm"
                        type="text"
                        placeholder="Enter place"
                        size="lg"
                        bgColor={"white"}
                        borderRadius={"2xl"}
                        _placeholder={{ color: "gray.400" }}
                        fontWeight={300}
                    />
                </FormControl> */}
                <SearchBarControl setPlace={setPlace} />
                <DateRangePicker setSelectedDate={setSelectedDate} />
                <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    maxHeight={"200px"}
                    placeholder="Enter a description..."
                    _placeholder={{ color: "gray.400" }}
                    bgColor={"white"}
                    paddingTop={"16px"}
                />
                <DropZone setUploadedFiles={setUploadedFiles} />
                <Button
                    onClick={handleSubmit}
                    fontSize="sm"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="16px"
                    borderRadius="2xl"
                    bgColor="#808000"
                    color="white"
                    _hover={{ bg: "green.600" }}
                >
                    Add to Map
                </Button>
            </Flex>
            {/* 
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
            /> */}
        </>
    );
};
