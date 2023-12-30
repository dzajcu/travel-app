"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Avatar,
    Stepper,
    Step,
    StepNumber,
    Flex,
    StepIndicator,
    StepDescription,
    StepSeparator,
    StepStatus,
    StepTitle,
    Text,
    useSteps,
} from "@chakra-ui/react";
import { Image } from "antd";
import { format } from "date-fns";
import moment from "moment";
import handleGetTour from "./handleGetTour";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ExploreDetails() {
    const { id } = useParams();
    const [tour, setTour] = useState({});

    const getTour = async () => {
        await handleGetTour(setTour, id);
    };
    useEffect(() => {
        getTour();
        setActiveStep(-1);
    }, []);

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: tour?.places?.length,
    });
    // setActiveStep(10);
    return (
        <Image.PreviewGroup>
            <Flex direction="column" gap="3">
                <Flex align="center" gap="4">
                    <Avatar name={tour?.user?.username} size="md" />
                    <Flex direction="column">
                        <Text fontSize="md">{tour?.user?.username}</Text>
                        <Text fontSize="sm">
                            {tour.createdAt && moment(tour.createdAt).fromNow()}
                        </Text>
                    </Flex>
                </Flex>
                {/* {tour.startDate && tour.endDate && (
                    <Text>
                        {format(new Date(tour?.startDate), "dd.MM.yyyy")} -{" "}
                        {format(new Date(tour?.endDate), "dd.MM.yyyy")}
                    </Text>
                )} */}
                <Text ml="64px">{tour?.description}</Text>
            </Flex>
            <Stepper
                size={{ base: "md", lg: "lg" }}
                index={activeStep}
                orientation="vertical"
                gap="10"
                // height="100%"
                colorScheme="green"
                mt="20px"
                ml="5px"
            >
                {tour?.places?.map((place, index) => (
                    <Step py="0px" key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepNumber />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink="0">
                            <StepTitle>
                                <Flex alignItems="center" gap="1" mb="5px" ml="7px">
                                    <FaMapMarkerAlt />
                                    <Text fontSize="sm">{place.placeName}</Text>
                                </Flex>
                            </StepTitle>
                            <StepDescription>
                                <Flex
                                    alignItems="center"
                                    gap="1"
                                    flexDirection="column"
                                >
                                    {place.images.map((image, index) => (
                                        <Image
                                            width={"100%"}
                                            src={image}
                                            style={{
                                                display: "inline-block",
                                                maxWidth: "500px",
                                            }}
                                        />
                                    ))}
                                </Flex>
                            </StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </Image.PreviewGroup>
    );
}
