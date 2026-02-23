import { useState } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";

const App=()=>{
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full sm:w-[40%] min-h-screen sm:min-h-[90vh] bg-white rounded-2xl shadow-sm p-6">
        <Header title="Note App" />
        <NoteForm onAdd={addNote} />
      </div>
    </div>
  )
}

export default App