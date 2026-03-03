import { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import Sidebar from "./components/Sidebar";

const STORAGE_KEY = "note-app-tasks";

const loadNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const DateTimeDisplay = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-center gap-4 text-gray-400">
      <div className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-xs font-medium">{time}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-xs font-medium">{date}</span>
      </div>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState(loadNotes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes((prev) => [{ ...note, completed: false }, ...prev]);
  };

  const toggleNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl min-h-screen sm:min-h-[90vh] flex rounded-2xl shadow-sm overflow-hidden">
        {/* Sidebar */}
        <div className="w-[320px] shrink-0 bg-gray-50 border-r border-gray-200">
          <Sidebar notes={notes} onToggle={toggleNote} onDelete={deleteNote} onUpdate={updateNote} />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white p-6 flex flex-col">
          <Header title="My ToDos" />
          <NoteForm onAdd={addNote} />
          <div className="mt-auto pt-6">
            <DateTimeDisplay />
            <p className="text-center text-xs text-gray-400 mt-4">
              All rights reserved <a href="https://github.com/Wahed126" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 underline">@Wahed126</a> &copy;2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;