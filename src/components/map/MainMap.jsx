import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
    ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SideForm } from "../SideForm";

export const MainMap = () => {
    const [markers, setMarkers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false); // Dodaj stan do zarządzania otwarciem/ukryciem formularza

    function LocationMarker() {
        const handleMapClick = (e) => {
            // const newMarker = {
            //     id: new Date().getTime(), // Unikalne ID markera
            //     position: e.latlng,
            // };
            // setMarkers([...markers, newMarker]);
            setIsFormOpen(!isFormOpen); // Dodaj funkcję do otwierania/ukrywania formularza
        };

        useMapEvents({
            click: handleMapClick,
        });

        return (
            <>
                {/* {markers.map((marker) => (
                    <Marker key={marker.id} position={marker.position}>
                        <Popup>Marker</Popup>
                    </Marker>
                ))} */}
            </>
        );
    }

    return (
        <Box pos="absolute" w={"100%"} right={0} zIndex={1}>
            <MapContainer
                center={[50.505, 7.09]}
                zoom={5}
                scrollWheelZoom={true}
                zoomControl={false}
                minZoom={3}
                maxZoom={18}
                maxBounds={[
                    [-90, -Infinity],
                    [90, Infinity],
                ]}
                worldCopyJump={true}
            >
                <ZoomControl position="topright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=xWuUkuzOcmwmtiu8Pvoj"
                    // url="https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=7qa3ED9McsuZTcHZ23UI"
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" //dark

                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                {/* <ToggleMapButton
                    setIsHidden={setIsHidden}
                    isHidden={isHidden}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                /> */}
                {/* {console.log(isFormOpen)} */}
            </MapContainer>

            <SideForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        </Box>
    );
};

// const ToggleMapButton = ({
//     isHidden,
//     setIsHidden,
//     isFormOpen,
//     setIsFormOpen,
// }) => {
//     const handleToggleMap = () => {
//         setIsHidden(!isHidden);
//         setIsFormOpen(!isFormOpen); // Dodaj funkcję do otwierania/ukrywania formularza
//     };

//     return (
//         <Button
//             onClick={handleToggleMap}
//             position="absolute"
//             top="80px"
//             right="10px"
//             zIndex="1000"
//             bg="white"
//             border={"1px solid #a3a3a3"}
//             borderRadius={2}
//             h="30px"
//             w="30px"
//             transition="all 2s ease-in-out"
//             boxShadow={"md"}
//             p="5px"
//             fontSize={15}
//         >
//             {isHidden ? (
//                 <FiChevronLeft size={20} />
//             ) : (
//                 <FiChevronRight size={20} />
//             )}
//         </Button>
//     );
// };
