"use client";

import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";

export default function Statistics() {
    return (
        <Center py={6}>
            <Box
                maxW={"445px"}
                w={"full"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"xl"}
                rounded={"3xl"}
                p={6}
                overflow={"hidden"}
            >
                <Box
                
                    h={"210px"}
                    bg={"gray.100"}
                    mt={-6}
                    mx={-6}
                    mb={28}
                    pos={"relative"}
                >
                    <Image
                        src={
                            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        }
                        fill
                        alt="Example"
                    />
                </Box>
                <Stack>
                    <Text
                        color={"green.500"}
                        textTransform={"uppercase"}
                        fontWeight={800}
                        fontSize={"sm"}
                        letterSpacing={1.1}
                    >
                        Blog
                    </Text>
                    <Heading
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color={useColorModeValue("gray.700", "white")}
                        fontSize={"2xl"}
                        fontFamily={"body"}
                    >
                        Boost your conversion rate
                    </Heading>
                    <Text color={"gray.500"}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                        diam nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam et
                        justo duo dolores et ea rebum.
                    </Text>
                </Stack>
                <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                    <Avatar
                        size={"sm"}
                        src={
                            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        }
                        borderColor={"gray.200"}
                        borderWidth={1}
                    />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text fontWeight={600}>Achim Rolle</Text>
                        <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}
