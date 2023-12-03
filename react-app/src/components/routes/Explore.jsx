"use client";
import { useState } from "react";
import ExploreCard from "./components/ExploreCard";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import handleGetAllTours from "./handleGetAllTours";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Explore() {
    const [tours, setTours] = useState([]);
    const getAllTours = async () => {
        await handleGetAllTours(setTours);
    };
    useEffect(() => {
        getAllTours();
    }, []);

    return (
        <Box width="95%">
            <ResponsiveMasonry
            columnsCountBreakPoints={{ 900: 1, 1200: 2 }}
        >
            <Masonry gutter="10px">
                {tours.map((tour) => (
                    <ExploreCard
                        key={tour._id}
                        username={tour.user.username}
                        place={tour.place}
                        images={Object.values(tour.images)} // Convert object values to an array
                        photos={tour.photo}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
        </Box>
    );
}
