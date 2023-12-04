"use client";
import { useState, useEffect } from "react";
import "@maptiler/geocoding-control/style.css";  
import { Box } from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ExploreCard from "./components/ExploreCard";
import handleGetAllTours from "./handleGetAllTours";

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
                        images={Object.values(tour.images)}
                        photos={tour.photo}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
        </Box>
    );
}
