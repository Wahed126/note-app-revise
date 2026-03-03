import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ReminderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const CATEGORIES = [
  { label: "Personal", color: "bg-sky-100 text-sky-700" },
  { label: "Work", color: "bg-amber-100 text-amber-700" },
  { label: "Shopping", color: "bg-pink-100 text-pink-700" },
  { label: "Health", color: "bg-emerald-100 text-emerald-700" },
  { label: "Study", color: "bg-violet-100 text-violet-700" },
];

const NoteForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [category, setCategory] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dateRef = useRef(null);
  const reminderRef = useRef(null);
  const inputRef = useRef(null);

  const showOptions = isFocused && text.trim().length > 0;

  // Ctrl+K shortcut to focus the input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({
      id: Date.now(),
      title: text.trim(),
      dueDate: dueDate || null,
      reminder: reminder || null,
      category: category || null,
    });
    setText("");
    setDueDate("");
    setReminder("");
    setCategory("");
    setShowCategoryPicker(false);
  };

  const handleBlur = (e) => {
    // Don't close if clicking inside the form area
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsFocused(false);
    setShowCategoryPicker(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatReminder = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const d = new Date(dateTimeStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    >
      <form
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={`bg-white border rounded-xl shadow-sm transition-all duration-200 ${
          isFocused
            ? "border-blue-400 shadow-md ring-1 ring-blue-100"
            : "border-gray-200"
        }`}
      >
        {/* Main input row */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a task (Ctrl+K)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent outline-none text-[15px]"
          />
          <AnimatePresence>
            {text.trim() && (
              <motion.button
                type="submit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-blue-500 hover:text-blue-600 font-semibold text-sm shrink-0 cursor-pointer"
              >
                Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Tags for selected date / reminder / category */}
        <AnimatePresence>
          {(dueDate || reminder || category) && (
            <motion.div
              className="flex flex-wrap gap-2 px-4 pb-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
            >
              {category && (
                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${CATEGORIES.find(c => c.label === category)?.color || "bg-gray-100 text-gray-600"}`}>
                  <TagIcon />
                  {category}
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    className="hover:opacity-70 cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </span>
              )}
              {dueDate && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                  <CalendarIcon />
                  {formatDate(dueDate)}
                  <button
                    type="button"
                    onClick={() => setDueDate("")}
                    className="hover:text-blue-800 cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </span>
              )}
              {reminder && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
                  <ReminderIcon />
                  {formatReminder(reminder)}
                  <button
                    type="button"
                    onClick={() => setReminder("")}
                    className="hover:text-green-800 cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Option buttons - appear when typing */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              className="flex items-center gap-1 px-3 py-2 border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Add Date */}
              <button
                type="button"
                onClick={() => dateRef.current?.showPicker()}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${
                  dueDate
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CalendarIcon />
                <span>Add date</span>
                <input
                  ref={dateRef}
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  tabIndex={-1}
                />
              </button>

              {/* Add Reminder */}
              <button
                type="button"
                onClick={() => reminderRef.current?.showPicker()}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${
                  reminder
                    ? "text-green-600 bg-green-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ReminderIcon />
                <span>Add reminder</span>
                <input
                  ref={reminderRef}
                  type="datetime-local"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  tabIndex={-1}
                />
              </button>

              {/* Category */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${
                    category
                      ? `${CATEGORIES.find(c => c.label === category)?.color || "bg-gray-100 text-gray-600"}`
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <TagIcon />
                  <span>{category || "Category"}</span>
                </button>
                {showCategoryPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => {
                          setCategory(cat.label);
                          setShowCategoryPicker(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 transition cursor-pointer flex items-center gap-2 ${
                          category === cat.label ? "font-medium" : ""
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${cat.color.split(" ")[0]}`} />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default NoteForm;
