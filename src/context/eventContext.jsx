import React, { createContext, useContext, useState } from "react";
import { initialEvent } from "../utils/helpers";

const EventContext = createContext(initialEvent);

export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(initialEvent);
  console.log({ selectedEvent });
  const updateSelectedEvent = (data) => {
    setSelectedEvent(data);
  };

  return (
    <EventContext.Provider value={{ selectedEvent, updateSelectedEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
