"use client";
import ExploreCard from "./components/ExploreCard";
import { Box, Flex } from "@chakra-ui/react";
import SearchBar from "../map/SearchBar";

export default function Explore() {
    return (
        <Flex gap={"4"} overflow={"hidden"} width="max-content">
            <ExploreCard />
            <ExploreCard />
        </Flex>
    );
}
