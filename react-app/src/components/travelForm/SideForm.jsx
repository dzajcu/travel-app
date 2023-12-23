import React, { useState } from "react";
import {
    Button,
    Flex,
    Heading,
    Text,
    HStack,
    CloseButton,
    Textarea,
    useToast,
    Box,
    Input,
    Divider,
    Icon,
    AbsoluteCenter,
    useSteps,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
} from "@chakra-ui/react";
import { DropZone } from "./components/FileDropZone";
import { DateRangePicker } from "./components/DatePicker";
import { SearchBarControl } from "../map/SearchBarControl";
import handleSubmitForm from "./components/handleSubmitForm";
import { IoCloudUploadSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

export const SideForm = ({ isSideFormOpen, onSideFormClose }) => {
    const toast = useToast();

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [albumFile, setAlbumFile] = useState(null);
    const [albumName, setAlbumName] = useState("");
    const [selectedDate, setSelectedDate] = useState([null, null]);
    const [description, setDescription] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [coordinates, setCoordinates] = useState([0, 0]);
    const [placesData, setPlacesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        albumFile: albumFile,
        albumName: albumName,
        selectedDate: selectedDate,
        description: description,
        places: [],
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormData((prevFormData) => ({
            ...prevFormData,
            albumName: albumName,
            albumFile: albumFile,
            selectedDate: selectedDate,
            description: description,
            places: placesData,
        }));
        await handleSubmitForm(formData, toast, setIsLoading, onSideFormClose);
    };

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: formData.length,
    });
    const handleAddPlace = () => {
        if (placeName === "") return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const newPlace = {
            placeName: placeName,
            coordinates: coordinates,
            uploadedFiles: uploadedFiles,
        };

        setPlacesData((prevPlacesData) => [...prevPlacesData, newPlace]);

        console.log(placesData);

        setPlaceName("");
        setUploadedFiles([]);
    };
    const handleFileChange = (e) => {
        setAlbumFile(e.target.files[0]);
    };
    return (
        <>
            <Flex
                height="100%"
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
                // borderBottomLeftRadius={{ base: "0", md: "3xl" }}
                // borderTopLeftRadius={{ base: "3xl", md: "0" }}
                backgroundColor="rgba(255, 255, 255, 1)"
                overflow="auto"
                css={{
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#808000",
                        borderRadius: "24px",
                    },
                }}
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
                        Add Tour
                        <Text color={"#808000"} ml={1}>
                            !
                        </Text>
                    </Heading>
                    <CloseButton onClick={onSideFormClose} />
                </HStack>
                <Box position="relative" padding="2">
                    <Divider />
                    <AbsoluteCenter bg="white" px="4">
                        Enter your travel details
                    </AbsoluteCenter>
                </Box>
                {/* <FormControl>
                </FormControl> */}
                <Flex flexDirection="row">
                    <Input
                        w="60%"
                        isRequired={true}
                        id="place"
                        fontSize="sm"
                        minHeight={"50px"}
                        type="text"
                        placeholder="Enter your album name..."
                        size="lg"
                        bgColor={"white"}
                        borderRadius={"2xl"}
                        _placeholder={{ color: "gray.400" }}
                        fontWeight={300}
                        onChange={(e) => setAlbumName(e.target.value)}
                    />
                    <label htmlFor="file" className="file-label">
                        <Flex flexDirection="row" alignContent="center" gap="2">
                            <Icon
                                as={IoCloudUploadSharp}
                                fontSize="2xl"
                                alignSelf="center"
                            />
                            <Text>Upload album image</Text>
                        </Flex>
                    </label>
                    <Input
                        display="none"
                        id="file"
                        type="file"
                        // minHeight="50px"
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </Flex>
                <DateRangePicker setSelectedDate={setSelectedDate} />
                <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    maxHeight={"200px"}
                    placeholder="Enter a description..."
                    _placeholder={{ color: "gray.400" }}
                    bgColor={"white"}
                    paddingTop={"16px"}
                />

                <Box position="relative" padding="2">
                    <Divider />
                    <AbsoluteCenter bg="white" px="4">
                        Enter place details
                    </AbsoluteCenter>
                </Box>
                <SearchBarControl
                    setPlace={setPlaceName}
                    setCoordinates={setCoordinates}
                />
                <DropZone setUploadedFiles={setUploadedFiles} />
                <Flex justifyContent="space-between">
                    <Stepper
                        size="md"
                        index={activeStep}
                        orientation="vertical"
                        gap="0"
                        height="100%"
                        colorScheme="gray"
                    >
                        {placesData.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepNumber />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink="0">
                                    <StepTitle>
                                        <Flex alignItems="center" gap="1">
                                            <FaMapMarkerAlt />
                                            <Text>
                                                {placesData[index].placeName}
                                            </Text>
                                        </Flex>
                                    </StepTitle>
                                    <StepDescription>
                                        <Flex alignItems="center" gap="1">
                                            <Text>
                                                Images:{" "}
                                                {
                                                    placesData[index].uploadedFiles.length
                                                }{" "}  
                                            </Text>
                                        </Flex>
                                    </StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                    <Button
                        onClick={handleAddPlace}
                        fontSize="sm"
                        fontWeight="500"
                        w="20%"
                        h="40px"
                        // mt="-20px"
                        mb="16px"
                        borderRadius="2xl"
                        bgColor="#808000"
                        color="white"
                        _hover={{ bg: "green.600" }}
                    >
                        Add place
                    </Button>
                </Flex>
                <Button
                    onClick={handleSubmit}
                    fontSize="sm"
                    fontWeight="500"
                    w="100%"
                    minHeight={"50px"}
                    h="50"
                    mb="16px"
                    borderRadius="2xl"
                    bgColor="#808000"
                    color="white"
                    _hover={{ bg: "green.600" }}
                    isLoading={isLoading}
                >
                    Add to Map
                </Button>
            </Flex>
        </>
    );
};
