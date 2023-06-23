import { Box } from "@chakra-ui/react";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";
import { memo } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const AllBranchesMap = ({ data }) => {
  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      onViewportChange={(newViewport) => setViewport(newViewport)}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 0 5px 0 rgb(0,0,0,0.1)",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      initialViewState={{
        latitude: data[0].geometry.coordinates[1],
        longitude: data[0].geometry.coordinates[0],
        zoom: 10,
      }}
    >
      {/* Render markers for each location */}
      {data.map((branch) => (
        <Marker
          key={branch._id} // Assuming each location has a unique ID
          latitude={branch.geometry.coordinates[1]} // Latitude of the location
          longitude={branch.geometry.coordinates[0]} // Longitude of the location
        >
          {/* You can customize the marker's appearance here */}
          <Box color={"green.400"} title={branch.name}>
            <FaMapMarkerAlt size={30} />
          </Box>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default memo(AllBranchesMap);
