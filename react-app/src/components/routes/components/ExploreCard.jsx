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

export default function ExploreCard() {
    return (
        <Card
            maxW="sm"
            // maxH="md"
            overflow="hidden"
            backgroundImage="https://cdn.pixabay.com/photo/2023/11/04/04/45/woman-8364265_1280.jpg"
            backgroundSize="cover"
            // backgroundSize="contain"
            backgroundRepeat="no-repeat"
        >
            <Image
                objectFit="cover"
                // src="https://cdn.pixabay.com/photo/2023/11/04/04/45/woman-8364265_1280.jpg"
                alt="Chakra UI"
            />
            <CardHeader>
                <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar name="Segu" src="https://bit.ly/sage-adebayo" />

                        <Box>
                            <Heading size="sm">Segun Adebayo</Heading>
                            <Text>Creator, Chakra UI</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="See menu"
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    With Chakra UI, I wanted to sync the speed of development with
                    the speed of design. I wanted the developer to be just as excited
                    as the designer to create a screen.
                </Text>
            </CardBody>

            {/* <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                    "& > button": {
                        minW: "136px",
                    },
                }}
            >
                <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                    Like
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                    Comment
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                    Share
                </Button>
            </CardFooter> */}
        </Card>
    );
}
