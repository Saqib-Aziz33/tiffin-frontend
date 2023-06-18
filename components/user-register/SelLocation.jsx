import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Box } from "@chakra-ui/react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

export default function SelLocation({ coordinates, setCoordinates }) {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: coordinates.lat,
    longitude: coordinates.lng,
  });

  const handleMarkerDragEnd = (e) => {
    setSelectedLocation({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
    setCoordinates({
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    });
  };

  //   React.useEffect(() => {
  //     console.log(selectedLocation);
  //   }, [selectedLocation]);

  return (
    <ReactMapGL
      initialViewState={{
        longitude: selectedLocation.longitude,
        latitude: selectedLocation.latitude,
        zoom: 14,
      }}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      onClick={(e) => {
        setSelectedLocation({
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        });
      }}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 0 5px 0 rgb(0,0,0,0.1)",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {selectedLocation && (
        <Marker
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        >
          <Box color={"green.400"}>
            <FaMapMarkerAlt size={30} />
          </Box>
        </Marker>
      )}
    </ReactMapGL>
  );
}
