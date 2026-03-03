import { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import Sidebar from "./components/Sidebar";
import DateTimeDisplay from "./components/DateTimeDisplay";
import Copyright from "./components/Copyright";
import StudyTasks from "./components/StudyTasks";

const STORAGE_KEY = "note-app-tasks";

const loadNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const App = () => {
  const [notes, setNotes] = useState(loadNotes);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <div
          className={`shrink-0 bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
            sidebarOpen ? "w-[320px]" : "w-0 border-r-0"
          }`}
        >
          <div className="w-[320px] h-full">
            <Sidebar notes={notes} onToggle={toggleNote} onDelete={deleteNote} onUpdate={updateNote} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white p-6 flex flex-col min-w-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer shrink-0"
              title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            >
              {sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <polyline points="15 9 12 12 15 15" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <polyline points="13 9 16 12 13 15" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <Header title="My ToDos" />
            </div>
          </div>
          <NoteForm onAdd={addNote} />
          <StudyTasks notes={notes} onToggle={toggleNote} />
          <div className="mt-auto pt-6">
            <DateTimeDisplay />
            <div className="mt-4">
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;