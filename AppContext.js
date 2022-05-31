import { createContext, useState } from "react";

export const AppContext = createContext({
  position: [],
});

export const AppContextProvider = ({ children }) => {
  const [position, setPosition] = useState([30.033333, 31.233334]);

  const changePositionHandler = (newPosition) => {
    const { latitude, longitude } = newPosition;
    setPosition([latitude, longitude]);
  };

  const value = { position, changePositionHandler };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
