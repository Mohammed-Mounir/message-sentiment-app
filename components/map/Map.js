import { useEffect, useContext, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { AppContext } from "../../AppContext";

import MarkerContainer from "../marker-container/MarkerContainer";

import "leaflet/dist/leaflet.css";

const Map = ({ messages }) => {
  const { position } = useContext(AppContext);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) map.flyTo(position, 6);
  }, [position, map]);

  return (
    <MapContainer
      center={position}
      zoom={6}
      scrollWheelZoom={true}
      whenCreated={(map) => setMap(map)}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {messages.map((data) => {
        return <MarkerContainer key={data.message} messageData={data} />;
      })}
    </MapContainer>
  );
};

export default Map;
