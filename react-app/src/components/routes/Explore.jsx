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
            <ResponsiveMasonry columnsCountBreakPoints={{ 900: 1, 1200: 2 }}>
                <Masonry gutter="10px">
                    {tours.map((tour) => (
                        <ExploreCard
                            key={tour._id}
                            id={tour._id}
                            name={tour.albumName}
                            username={tour.user.username}
                            places={tour.places.length}
                            image={tour.albumImage}
                            date={[tour.startDate, tour.endDate]}
                            createdAt={tour.createdAt}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </Box>
    );
}
