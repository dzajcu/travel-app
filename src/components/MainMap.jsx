import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const MainMap = () => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <Card
            pos="absolute"
            size={"lg"}
            p={2}
            boxShadow="md"
            w={isHidden ? "50%" : "80%"}
            ml={"auto"}
            right={2}
            transition={"all 0.4s cubic-bezier(.52,-0.28,.5,1.23)"}
        >
            <MapContainer
                center={[50.505, 7.09]}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <ToggleMapButton
                    setIsHidden={setIsHidden}
                    isHidden={isHidden}
                />
            </MapContainer>
        </Card>
    );
};

const ToggleMapButton = ({ isHidden, setIsHidden }) => {
    const handleToggleMap = () => {
        setIsHidden(!isHidden);
    };

    return (
        <Button
            onClick={handleToggleMap}
            position="absolute"
            top="80px"
            left="10px"
            zIndex="1000"
            bg="white"
            border={"1px solid #a3a3a3"}
            borderRadius={2}
            h="30px"
            w="30px"
            transition="all 2s ease-in-out"
            boxShadow={"md"}
            p="5px"
            fontSize={15}
        >
            {isHidden ? (
                <FiChevronLeft size={20} />
            ) : (
                <FiChevronRight size={20} />
            )}
            
        </Button>
    );
};
