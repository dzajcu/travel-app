"use client";

import {
    Avatar,
    Box,
    Card,
    CardFooter,
    CardBody,
    Stack,
    Flex,
    Heading,
    IconButton,
    Text,
    Icon,
    HStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ExploreCard({ id, name, username, places, image, date }) {
    const isImage = image.length > 0;
    const navigate = useNavigate();
    const startDateFormatted = format(
        new Date("2023-12-13T00:00:00.000Z"),
        "dd.MM.yyyy"
    );
    const endDateFormatted = format(
        new Date("2023-12-14T00:00:00.000Z"),
        "dd.MM.yyyy"
    );
    return (
        <Card
            display="inline-block"
            h={isImage ? "350px" : "100px"}
            w={"100%"}
            overflow="hidden"
            // backgroundImage={`url(${randomImage})`}
            backgroundImage={
                isImage
                    ? `url(${image})`
                    : `radial-gradient(circle at 50% 50%, #f3f3f3 0%, #e0e0e0 100%)`
            }
            backgroundSize="cover"
            borderRadius="xl"
            _hover={{
                transform: "translate(15px)",
                boxShadow: "sm",
                zIndex: 2,
            }}
            transition={"transform 0.3s ease"}
            cursor={"pointer"}
            onClick={() => {
                navigate(`/menu/explore/${id}`);
            }}
        >
            <Box
                backgroundImage={`linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0) 100%);
                `}
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                zIndex={1}
            />
            <Stack>
                <CardBody
                    pos="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%, -70%)"
                    zIndex={2}
                    textAlign="center"
                    width="100%"
                >
                    <Heading
                        size="md"
                        color="rgba(255, 255, 255, 0.7)"
                        letterSpacing="1rem"
                    >
                        {name.toUpperCase()}
                    </Heading>
                    <Text py="2" color="rgba(255, 255, 255, 0.4)" letterSpacing=".2rem">
                        {startDateFormatted} - {endDateFormatted}
                    </Text>
                </CardBody>
                <CardFooter color="white" pos="absolute" bottom="0" zIndex={2}>
                    <Flex spacing="4">
                        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                            <Avatar name={username} size="sm" />

                            <Box>
                                <Heading ml={0} size="sm" fontWeight="400">
                                    {username}
                                </Heading>
                                <HStack>
                                    <Icon as={FaMapMarkerAlt} boxSize={3} />
                                    <Text fontSize="sm" color="gray.400">
                                        {places} places
                                    </Text>
                                </HStack>
                            </Box>
                        </Flex>
                    </Flex>
                </CardFooter>
            </Stack>
            {/* <CardBody>
                <Text>
                    With Chakra UI, I wanted to sync the speed of development with
                    the speed of design. I wanted the developer to be just as excited
                    as the designer to create a screen.
                </Text>
            </CardBody> */}
        </Card>
    );
}
