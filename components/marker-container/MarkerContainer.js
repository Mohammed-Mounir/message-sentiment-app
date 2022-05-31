import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { divIcon } from "leaflet";

import RoomIcon from "@mui/icons-material/Room";

import styles from "./MarkerContainer.module.scss";

const MarkerContainer = ({ messageData }) => {
  const {
    message,
    sentiment,
    location: { latitude, longitude },
  } = messageData;

  const sentimentClass =
    sentiment.toLowerCase() === "positive"
      ? "positive"
      : sentiment.toLowerCase() === "negative"
      ? "negative"
      : "neutral";

  const sentimentColor =
    sentiment.toLowerCase() === "positive"
      ? "green"
      : sentiment.toLowerCase() === "negative"
      ? "red"
      : "blue";

  const iconMarkup = renderToStaticMarkup(
    <RoomIcon
      style={{
        fill: sentimentColor,
      }}
    />
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [32, 32],
    className: "dummy",
  });

  return (
    <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
      <Popup className={`${styles.popup} ${styles[sentimentClass]}`}>
        {message}
      </Popup>
      <Tooltip>{sentiment} sentiment</Tooltip>
    </Marker>
  );
};

export default MarkerContainer;
