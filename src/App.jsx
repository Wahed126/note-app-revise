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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl min-h-screen sm:min-h-[90vh] flex rounded-2xl shadow-sm overflow-hidden">
        {/* Sidebar */}
        <div className="w-[320px] shrink-0 bg-gray-50 border-r border-gray-200">
          <Sidebar notes={notes} onToggle={toggleNote} onDelete={deleteNote} onUpdate={updateNote} />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white p-6">
          <Header title="Note App" />
          <NoteForm onAdd={addNote} />
        </div>
      </div>
    </div>
  );
};

export default App;