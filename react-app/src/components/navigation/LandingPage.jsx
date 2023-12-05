import { Fragment } from "react";
import {
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    Button,
    Link,
    Icon,
    Flex,
    Box,
    Image,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
// Here we have used react-icons package for the icons
import { PiSignIn } from "react-icons/pi";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";

const features = [
    {
        title: "Save your memories",
        detail: "Create your own travel map and save your tours in one place",
        icon: <BiSolidImageAdd />
    },
    {
        title: "Inspire yourself!",
        detail: "Explore other users' trips and get inspired for your next adventure",
        icon: <MdTravelExplore />
    },

];
const LandingPage = () => {
    return (
        <Fragment>
            <Container maxW="6xl" px={{ base: 6, md: 10 }} py={14} mt="120">
                <Stack direction={{ base: "column", md: "row" }}>
                    <Stack direction="column" spacing={10} justifyContent="center">
                        <chakra.h1
                            fontSize="5xl"
                            lineHeight={1}
                            fontWeight="bold"
                            textAlign="left"
                        >
                            Your Jorney Map -
                            <chakra.span
                                bgGradient="linear(to-br, #808000, yellow.700)"
                                bgClip="text"
                            >
                                {" "}
                                Mapify{" "}
                            </chakra.span>{" "}
                            <br /> Explore and Share Your Adventures
                        </chakra.h1>
                        <Text
                            color={useColorModeValue("gray.500", "gray.400")}
                            fontSize="lg"
                            textAlign="left"
                            fontWeight="400"
                            maxW="700px"
                        >
                            Discover and document your travels effortlessly with our
                            interactive map application. Save the magic of each
                            moment with our user-friendly features.
                        </Text>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={{ base: 5, md: 10 }}
                            flexWrap="wrap"
                        >
                            {features.map((feature, index) => (
                                <Stack
                                    key={index}
                                    direction={{ base: "row", md: "column" }}
                                    spacing={2}
                                >
                                    <Flex
                                        p={3}
                                        maxH="52px"
                                        w="max-content"
                                        color="white"
                                        // bgGradient="linear(to-br, #228be6, #15aabf)"
                                        bgGradient="linear(to-br, yellow.500, #808000)"
                                        rounded="md"
                                        style={{ fontSize: "24px" }}  // Zmienione rozmiary ikony

                                    >
                                        {feature.icon}
                                    </Flex>
                                    <Stack direction="column" spacing={2}>
                                        <Text fontSize="md" fontWeight="500">
                                            {feature.title}
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            color="gray.400"
                                            maxW={{ base: "100%", md: "200px" }}
                                        >
                                            {feature.detail}
                                        </Text>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            spacing={{ base: 0, sm: 2 }}
                            flexWrap="wrap"
                        >
                            <NavLink to="/auth/sign-up">
                                <chakra.button
                                    h={12}
                                    px={6}
                                    bgGradient="linear(to-br, #808000, yellow.700)"
                                    color="white"
                                    _hover={{
                                        bgGradient:
                                            "linear(to-br, yellow.700, #808000)",
                                    }}
                                    variant="solid"
                                    size="lg"
                                    rounded="md"
                                    fontWeight="bold"
                                    mb={{ base: 2, sm: 0 }}
                                >
                                    <chakra.span> Create an account </chakra.span>
                                </chakra.button>
                            </NavLink>
                            <NavLink to="/auth/sign-in">
                                <Flex
                                    border="1px solid"
                                    borderColor="gray.700"
                                    justifyContent="center"
                                    p={3}
                                    px={4}
                                    lineHeight={1.18}
                                    rounded="md"
                                    boxShadow="md"
                                    fontWeight="bold"
                                    alignItems="center"
                                    as={Link}
                                >
                                    <Icon as={PiSignIn} h={4} w={4} />
                                    <chakra.span ml={1}>Sign In</chakra.span>
                                </Flex>
                            </NavLink>
                        </Stack>
                    </Stack>
                    <Box pos="absolute" right="10%" top="50%" maxW="20%">
                        <Image src="../../public/Logo2.png" />
                    </Box>
                </Stack>
            </Container>
            <Box overflow="hidden">
                <svg
                    fill={useColorModeValue("white", "#171923")}
                    width="150%"
                    height="56px"
                    transform="scaleX(-1)"
                    filter="drop-shadow(10px 5px 5px rgba(0, 0, 0, 0.25))"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={`M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 
            250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 
            3V0H0v27.35a600.21 600.21 0 00321.39 29.09z`}
                    ></path>
                </svg>
            </Box>
        </Fragment>
    );
};

export default LandingPage;
