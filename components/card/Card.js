import { useContext } from "react";
import { AppContext } from "../../AppContext";

import styles from "./Card.module.scss";

const Card = ({ messageEntry, children }) => {
  const { changePositionHandler } = useContext(AppContext);

  const { sentiment, location } = messageEntry;

  const sentimentClass =
    sentiment.toLowerCase() === "positive"
      ? "positive"
      : sentiment.toLowerCase() === "negative"
      ? "negative"
      : "neutral";

  const onCardOverHandler = () => {
    changePositionHandler(location);
  };

  return (
    <div
      onMouseOver={onCardOverHandler}
      className={`${styles.card} ${styles[sentimentClass]}`}
    >
      {children}
    </div>
  );
};

export default Card;
