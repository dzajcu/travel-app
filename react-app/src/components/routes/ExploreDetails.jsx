"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import handleGetTour from "./handleGetTour";

export default function ExploreDetails() {
    const { id } = useParams();
    const [tour, setTour] = useState({});

    const getTour = async () => {
        await handleGetTour(setTour, id);
    };
    useEffect(() => {
        getTour();
    }, []);
    return (
        <Box width="95%" backgroundColor="red">
            chuj
        </Box>
    );
}
