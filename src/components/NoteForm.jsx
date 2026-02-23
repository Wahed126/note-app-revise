import { useState } from "react";
import { motion } from "framer-motion";

const NoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ id: Date.now(), title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <motion.div
      className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
        <button
          type="submit"
          className="self-end px-5 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 active:scale-95 transition cursor-pointer"
        >
          Add Note
        </button>
      </form>
    </motion.div>
  );
};

export default NoteForm;
