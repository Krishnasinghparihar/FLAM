import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { EventContext } from "../context/EventContext";
import { v4 as uuidv4 } from "uuid";

const EventModal = ({ selectedDate, selectedEvent }) => {
  const { closeModal, addEvent, editEvent, deleteEvent } = useContext(EventContext);
  const isEditMode = !!selectedEvent;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setTitle(selectedEvent.title || "");
      setDescription(selectedEvent.description || "");
      setTime(selectedEvent.time || "");
    } else {
      setTitle("");
      setDescription("");
      setTime("");
    }
  }, [isEditMode, selectedEvent, selectedDate]);

  const handleSubmit = () => {
    if (isEditMode) {
      editEvent({
        ...selectedEvent,
        title,
        description,
        time,
        date: format(selectedDate, "yyyy-MM-dd")
      });
    } else {
      const newEvent = {
        id: uuidv4(),
        title,
        description,
        date: format(selectedDate, "yyyy-MM-dd"),
        time
      };
      addEvent(newEvent);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (isEditMode && selectedEvent) {
      deleteEvent(selectedEvent.id);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-xl mb-2">
          {isEditMode ? "Edit Event" : "Add Event"} - {format(selectedDate, "dd MMM yyyy")}
        </h2>
        <input
          type="text"
          placeholder="Event Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 w-full mb-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
          {isEditMode && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          )}
          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
