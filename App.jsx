import React from "react";
import Calendar from "./components/Calendar";
import { EventProvider } from "./context/EventContext";

function App() {
  return (
    <EventProvider>
      <div className="App">
        <h1 className="text-2xl text-center my-4 font-bold">📅 Custom Event Calendar</h1>
        <Calendar />
      </div>
    </EventProvider>
  );
}

export default App;
