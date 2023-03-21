import React, { createContext, useContext, useState } from "react";

const initialEvent = {
  dateAndTime: new Date().toISOString().split(":").slice(0, 2).join(":"),
  city: { label: "", value: "" },
  title: "",
};

const EventContext = createContext(initialEvent);

export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(initialEvent);

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
