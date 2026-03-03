import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "./Pagination";

const CalendarIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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

const ReminderIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EditIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const SaveIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CancelIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TagIcon = ({ size = 12 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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

const CATEGORY_COLORS = {
  Personal: "bg-sky-100 text-sky-700",
  Work: "bg-amber-100 text-amber-700",
  Shopping: "bg-pink-100 text-pink-700",
  Health: "bg-emerald-100 text-emerald-700",
  Study: "bg-violet-100 text-violet-700",
};

const CATEGORY_BG = {
  Personal: "bg-sky-50/70 border-sky-200/60",
  Work: "bg-amber-50/70 border-amber-200/60",
  Shopping: "bg-pink-50/70 border-pink-200/60",
  Health: "bg-emerald-50/70 border-emerald-200/60",
  Study: "bg-violet-50/70 border-violet-200/60",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
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

const NoteCard = ({ note, onToggle, onDelete, onUpdate, index = 0 }) => {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editText, setEditText] = useState(note.title);
  const editRef = useRef(null);
  const confirmTimer = useRef(null);

  // Auto-dismiss confirmation after 3 seconds
  useEffect(() => {
    if (confirmDelete) {
      confirmTimer.current = setTimeout(() => setConfirmDelete(false), 3000);
    }
    return () => clearTimeout(confirmTimer.current);
  }, [confirmDelete]);

  useEffect(() => {
    if (editing && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    if (!editText.trim()) return;
    onUpdate(note.id, { title: editText.trim() });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(note.title);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const cardBg = note.category && !note.completed
    ? CATEGORY_BG[note.category] || "bg-white border-gray-200"
    : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.04, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      className={`group relative rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all duration-200 cursor-default ${
        note.completed
          ? "bg-gray-50 border border-gray-100 opacity-60"
          : cardBg || "bg-white border border-gray-200 hover:border-gray-300"
      } ${!note.completed && cardBg ? "border" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(note.id)}
          className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-all duration-200 cursor-pointer ${
            note.completed
              ? "bg-blue-500 border-blue-500 text-white"
              : "border-gray-300 hover:border-blue-400 text-transparent hover:text-blue-300"
          }`}
        >
          <CheckIcon />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={editRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
            />
          ) : (
            <p
              className={`text-sm font-medium leading-snug transition-all duration-200 ${
                note.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {note.title}
            </p>
          )}

          {/* Meta info (date, reminder & category) */}
          {(note.dueDate || note.reminder || note.category) && !editing && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
              {note.category && (
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[note.category] || "bg-gray-100 text-gray-600"}`}>
                  <TagIcon size={10} />
                  {note.category}
                </span>
              )}
              {note.dueDate && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-500">
                  <CalendarIcon size={12} />
                  {formatDate(note.dueDate)}
                </span>
              )}
              {note.reminder && (
                <span className="inline-flex items-center gap-1 text-xs text-green-500">
                  <ReminderIcon size={12} />
                  {formatReminder(note.reminder)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {editing ? (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition cursor-pointer"
              title="Save"
            >
              <SaveIcon />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition cursor-pointer"
              title="Cancel"
            >
              <CancelIcon />
            </button>
          </div>
        ) : (
          <div className={`flex items-center gap-0.5 shrink-0 transition-opacity duration-150 ${
            confirmDelete ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}>
            {confirmDelete ? (
              <>
                <span className="text-xs text-red-500 font-medium mr-1">Delete?</span>
                <button
                  onClick={() => onDelete(note.id)}
                  className="px-2 py-1 rounded-lg text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition cursor-pointer"
                  title="Confirm delete"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                  title="Cancel"
                >
                  No
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition cursor-pointer"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                  title="Delete"
                >
                  <TrashIcon />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ITEMS_PER_PAGE = 7;

const Sidebar = ({ notes, onToggle, onDelete, onUpdate }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(notes.length / ITEMS_PER_PAGE));

  // Reset to page 1 if notes shrink below current page
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [notes.length, page, totalPages]);

  const paginatedNotes = notes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-semibold text-gray-700 tracking-tight flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          My Tasks
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {notes.filter((n) => !n.completed).length} task
          {notes.filter((n) => !n.completed).length !== 1 ? "s" : ""} remaining
        </p>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-2">
        <AnimatePresence mode="wait" initial={false}>
          {notes.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-16 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="15" x2="16" y2="15" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <p className="mt-3 text-sm">No tasks yet</p>
            </motion.div>
          ) : (
            <motion.div
              key={`page-${page}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-2"
            >
              {paginatedNotes.map((note, index) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Sidebar;
