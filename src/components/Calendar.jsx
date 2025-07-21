import React, { useContext, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths
} from "date-fns";
import Day from "./Day";
import { EventContext } from "../context/EventContext";
import EventModal from "./EventModal";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { modalOpen, openModal } = useContext(EventContext);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedEvent(null);
    openModal();
  };

  const handleEventClick = (event, day) => {
    setSelectedDate(day);
    setSelectedEvent(event);
    openModal();
  };

  const renderHeader = () => (
    <div className="header flex justify-between items-center p-4 bg-gray-200">
      <button onClick={prevMonth}>&lt;</button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayCopy = day;
        days.push(
          <Day
            key={day}
            day={day}
            currentMonth={currentMonth}
            onClick={() => handleDayClick(dayCopy)}
            onEventClick={(event) => handleEventClick(event, dayCopy)}
          />
        );
        day = addDays(day, 1);
      }
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  return (
    <div className="calendar max-w-4xl mx-auto p-4">
      {renderHeader()}
      <div className="days grid grid-cols-7 text-center font-semibold bg-gray-100 p-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {renderDays()}
      {modalOpen && selectedDate && (
        <EventModal selectedDate={selectedDate} selectedEvent={selectedEvent} />
      )}
    </div>
  );
};

export default Calendar;
