"use client";

import {
    Avatar,
    Box,
    Card,
    CardFooter,
    Flex,
    Heading,
    IconButton,
    Text,
    Icon,
    HStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ExploreCard({ id, username, place, images, photo }) {
    const [randomImage, setRandomImage] = useState("");
    const areImages = images.length > 0;
    const navigate = useNavigate();
    return (
        <Card
            display="inline-block"
            h={areImages ? "350px" : "100px"}
            w={"100%"}
            overflow="hidden"
            // backgroundImage={`url(${randomImage})`}
            backgroundImage={
                areImages
                    ? `url(${images[0]})`
                    : `https://travel-map-bucket.s3.eu-north-1.amazonaws.com/1701634278178-Designer.jpeg`
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
            <CardFooter color="white" pos="absolute" bottom="0" zIndex={2}>
                <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar name={username} src={photo} size="sm" />

                        <Box>
                            <Heading ml={0} size="sm" fontWeight="400">
                                {username}
                            </Heading>
                            <HStack>
                                <Icon as={FaMapMarkerAlt} boxSize={3} />
                                <Text fontSize="sm" color="gray.400">
                                    {place}
                                </Text>
                            </HStack>
                        </Box>
                    </Flex>
                </Flex>
            </CardFooter>
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
