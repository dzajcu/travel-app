"use client";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function ExploreCard() {
    const [randomImage, setRandomImage] = useState("");

    // Funkcja pobierająca losowe zdjęcie z Unsplash
    const fetchRandomImage = async () => {
        try {
            const response = await fetch(
                "https://source.unsplash.com/random/300x300" // Ustaw rozmiar zdjęcia
            );
            setRandomImage(response.url);
        } catch (error) {
            console.error("Error fetching random image:", error);
        }
    };

    useEffect(() => {
        fetchRandomImage();
    }, []); // Uruchom tylko raz po zamontowaniu komponentu

    return (
        <Card
            h={"350px"}
            w={{ md: "95%", xl: "46%" }}
            overflow="hidden"
            backgroundImage={`url(${randomImage})`}
            backgroundSize="cover"
            borderRadius="xl"
            _hover={{
                transform: "translate(12px)",
            }}
            transition={"transform 0.3s ease"}
            cursor={"pointer"}
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
            <CardFooter color="white" pos="absolute" bottom="0" zIndex={2} m={2}>
                <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar name="Segu" src="https://bit.ly/sage-adebayo" />

                        <Box>
                            <Heading size="sm">Segun Adebayo</Heading>
                            <Text color="gray.300">Creator, Chakra UI</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        color="white"
                        aria-label="See menu"
                        icon={<BsThreeDotsVertical />}
                    />
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
