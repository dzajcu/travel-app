"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
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
    }, []);

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: tour?.places?.length,
    });
    // setActiveStep(10);
    return (
        <Image.PreviewGroup
            
        >
            {/* {tour.places
                    ? tour.places.map((place) => (
                          <Box key={place._id}>
                              <h2>{place.placeName}</h2>
                              {place.images.map((image) => (
                                  <Image
                                      width={"100%"}
                                      src={image}
                                      style={{
                                          display: "inline-block",
                                          maxWidth: "400px",
                                      }}
                                  />
                              ))}
                          </Box>
                      ))
                    : ""} */}

            <Stepper
                size={{ base: "md", lg: "lg"}}
                index={activeStep}
                orientation="vertical"
                gap="10"
                // height="100%"
                colorScheme="black"
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
                                <Flex alignItems="center" gap="1">
                                    <FaMapMarkerAlt />
                                    <Text>{place.placeName}</Text>
                                </Flex>
                            </StepTitle>
                            <StepDescription>
                                <Flex alignItems="center" gap="1" flexDirection="column">
                                    {place.images.map((image, index) => (
                                        <Image
                                            width={"100%"}
                                            src={image}
                                            style={{
                                                display: "inline-block",
                                                maxWidth: "200px",
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
