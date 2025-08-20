import React from "react";
import ReactDOM from "react-dom/client";
import { Calendar } from "lucide-react";
import timelineItems from "./timelineItems.js";
import Timeline from "./components/Timeline";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-none mx-auto" style={{ maxWidth: '95vw' }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
          <Calendar className="w-7 h-7" />
          Timeline Visualization
        </h2>
        <Timeline items={timelineItems} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);