import React, { createContext, useState, useEffect } from "react";
import { format } from "date-fns";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : [];
  });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addEvent = (event) => {
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const editEvent = (updatedEvent) => {
    const updatedEvents = events.map((e) =>
      e.id === updatedEvent.id ? { ...e, ...updatedEvent } : e
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const getEventsForDate = (date) => {
    const day = format(date, "yyyy-MM-dd");
    return events.filter((e) => e.date === day);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        getEventsForDate,
        modalOpen,
        openModal,
        closeModal
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
