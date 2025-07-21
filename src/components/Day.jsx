import React, { useContext } from "react";
import { format, isSameMonth, isToday } from "date-fns";
import { EventContext } from "../context/EventContext";

const Day = ({ day, currentMonth, onClick, onEventClick }) => {
  const { getEventsForDate } = useContext(EventContext);
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isCurrentDay = isToday(day);
  const events = getEventsForDate(day);

  return (
    <div
      className={`h-24 p-2 border text-sm cursor-pointer hover:bg-blue-50 overflow-auto
        ${!isCurrentMonth ? "text-gray-400" : ""}
        ${isCurrentDay ? "bg-blue-100 font-bold border-blue-400" : ""}`}
      onClick={onClick}
    >
      <div className="font-medium">{format(day, "d")}</div>
      {events.map((e) => (
        <div
          key={e.id}
          className="bg-blue-200 rounded text-xs px-1 mt-1 truncate cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            onEventClick && onEventClick(e);
          }}
        >
          {e.title}
        </div>
      ))}
    </div>
  );
};

export default Day;
